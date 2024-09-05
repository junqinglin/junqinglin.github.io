---
title: 自定义注解，通过AOP实现公共字段填充
auther: ljq
top_img: https://pic.linjq.top/img/top_img.jpg
abbrlink: 2454e4a5
date: 2024-03-25 20:32:04
categories:
  - 后端
tags:
  - Java
mathjax: 
aside: 
cover: https://pic.linjq.top/img/default_post_cover.png
description: 要介绍反射、注解、AOP相关知识，并介绍如何通过AOP实现公共字段填充
---
# 问题描述

在开发中，我们通常会维护很多的数据表，而这些数据表中有一些字段是一样的，如**创建时间、修改时间**等。在插入或者更新表数据时，我们在操作每个表时，需要写重复的语句更新这些字段。为了避免重复代码，我们可以通过使用AOP来实现公共字段的填充，减少重复操作。

# 前置知识

## 反射
> 参考[反射](https://www.liaoxuefeng.com/wiki/1252599548343744/1255945147512512)

### 什么是反射
反射就是Reflection，Java的反射是指程序在运行期可以拿到一个对象的所有信息。反射是为了解决在运行期，对某个实例一无所知的情况下，如何调用其方法。
### Class类
除了int等基本类型外，Java的其他类型全部都是class（包括interface)

- JVM为每个加载的class创建了对应的Class实例，并在实例中保存了该class的所有信息，包括类名、包名、父类、实现的接口、所有方法、字段等，因此，如果获取了某个Class实例，我们就可以通过这个Class实例获取到该实例对应的class的所有信息。
- 通过Class实例获取class信息的方法称为反射（Reflection）；
- JVM总是动态加载class，可以在运行期根据条件来控制加载class。

获取Class类的方法：
```cpp
//一：直接通过静态变量class获取
Class cls = String.class;
//二：通过实例获取
String s = "Hello";
Class cls = s.getClass();
//三：通过完整类名获取
Class cls = Class.forName("java.lang.String");
```

### 访问字段
Java的反射API提供的Field类封装了字段的所有信息：

- 通过Class实例的方法可以获取Field实例：getField()，getFields()，getDeclaredField()，getDeclaredFields()；
- 通过Field实例可以获取字段信息：getName()，getType()，getModifiers()；
- 通过Field实例可以读取或设置某个对象的字段，如果存在访问限制，要首先调用setAccessible(true)来访问非public字段。
- 通过反射读写字段是一种非常规方法，它会破坏对象的封装。
### 调用方法
Java的反射API提供的Method对象封装了方法的所有信息：

- 通过Class实例的方法可以获取Method实例：getMethod()，getMethods()，getDeclaredMethod()，getDeclaredMethods()；
- 通过Method实例可以获取方法信息：getName()，getReturnType()，getParameterTypes()，getModifiers()；
- 通过Method实例可以调用某个对象的方法：Object invoke(Object instance, Object... parameters)；
- 通过设置setAccessible(true)来访问非public方法；
- 通过反射调用方法时，仍然遵循多态原则。
## 注解
> 参考[注解](https://www.liaoxuefeng.com/wiki/1252599548343744/1255945389098144)

### 什么是注解
注解是放在Java源码的类、方法、字段、参数前的一种特殊“注释”。注释会被编译器直接忽略，注解则可以被编译器打包进入class文件，因此，注解是一种用作标注的“元数据”。
### 注解类型
注解有三种类型：
第一类是由编译器使用的注解，例如：

- @Override：让编译器检查该方法是否正确地实现了覆写；
- @SuppressWarnings：告诉编译器忽略此处代码产生的警告。

这类注解不会被编译进入.class文件，它们在编译后就被编译器扔掉了。
第二类是由工具处理.class文件使用的注解，比如有些工具会在加载class的时候，对class做动态修改，实现一些特殊的功能。这类注解会被编译进入.class文件，但加载结束后并不会存在于内存中。这类注解只被一些底层库使用，一般我们不必自己处理。
第三类是在程序运行期能够读取的注解，它们在加载后一直存在于JVM中，这也是最常用的注解。例如，一个配置了@PostConstruct的方法会在调用构造方法后自动被调用（这是Java代码读取该注解实现的功能，JVM并不会识别该注解）。
### 定义注解
Java语言使用@interface语法来定义注解（Annotation），它的格式如下：
```cpp
public @interface Report {
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```
注解的参数类似无参数方法，可以用default设定一个默认值（强烈推荐）。最常用的参数应当命名为value。
#### 元注解
有一些注解可以修饰其他注解，这些注解就称为元注解（meta annotation）。
下面介绍一些常用元注解：
@Target
最常用的元注解是@Target。使用@Target可以定义Annotation能够被应用于源码的哪些位置：

- 类或接口：ElementType.TYPE；
- 字段：ElementType.FIELD；
- 方法：ElementType.METHOD；
- 构造方法：ElementType.CONSTRUCTOR；
- 方法参数：ElementType.PARAMETER。
```cpp
@Target(ElementType.METHOD)
public @interface Report {
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```
@Retention
另一个重要的元注解@Retention定义了Annotation的生命周期：

- 仅编译期：RetentionPolicy.SOURCE；
- 仅class文件：RetentionPolicy.CLASS；
- 运行期：RetentionPolicy.RUNTIME。

默认为CLASS，我们通常自定义的一般是RUNTIME，因此需要加上。
```cpp
@Retention(RetentionPolicy.RUNTIME)
public @interface Report {
    int type() default 0;
    String level() default "info";
    String value() default "";
}
```
此外还有：@Repeatable定义注解是否可重复，@Inherited定义子类是否可继承父类定义的注解。


### 处理注解
SOURCE类型的注解主要由编译器使用，因此我们一般只使用，不编写。CLASS类型的注解主要由底层工具库使用，涉及到class的加载，一般我们很少用到。只有RUNTIME类型的注解不但要使用，还经常需要编写。因此，我们只讨论如何读取RUNTIME类型的注解。
#### 一、读取注解
读取注解，需要使用反射API，判断某个注解是否存在于Class、Field、Method或Constructor：

- Class.getAnnotation(Class)
- Field.getAnnotation(Class)
- Method.getAnnotation(Class)
- Constructor.getAnnotation(Class)

方法一是先判断Annotation是否存在，如果存在，就直接读取：
```cpp
Class cls = Person.class;
if (cls.isAnnotationPresent(Report.class)) {
    Report report = cls.getAnnotation(Report.class);
    ...
}
```
第二种方法是直接读取Annotation，如果Annotation不存在，将返回null
```cpp
Class cls = Person.class;
Report report = cls.getAnnotation(Report.class);
if (report != null) {
   ...
}
```
#### 二、使用注解
注解如何使用，完全由程序自己决定，我们必须自己编写代码来使用注解。
```cpp
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Range {
    int min() default 0;
    int max() default 255;
}
```
```cpp
public class Person {
    @Range(min=1, max=20)
    public String name;

    @Range(max=10)
    public String city;
}
```
```cpp
void check(Person person) throws IllegalArgumentException, ReflectiveOperationException {
    // 遍历所有Field:
    for (Field field : person.getClass().getFields()) {
        // 获取Field定义的@Range:
        Range range = field.getAnnotation(Range.class);
        // 如果@Range存在:
        if (range != null) {
            // 获取Field的值:
            Object value = field.get(person);
            // 如果值是String:
            if (value instanceof String s) {
                // 判断值是否满足@Range的min/max:
                if (s.length() < range.min() || s.length() > range.max()) {
                    throw new IllegalArgumentException("Invalid field: " + field.getName());
                }
            }
        }
    }
}
```
## AOP
 AOP(Aspect Oriented Programming)面向切面编程，一种编程范式，指导开发者如何组织程序结构。AOP可以在不惊动原始设计的基础上为其进行功能增强。
### AOP核心概念
#### 连接点
连接点在AOP中可以理解为任意方法的执行
#### 切入点
切入点即匹配连接点的式子，也是具有共性功能的方法描述。
 在SpringAOP中，一个切入点可以描述一个具体方法，也可也匹配多个方法（可以通过切入点表达式来匹配多个方法）
>  连接点范围要比切入点范围大，是切入点的方法也一定是连接点，但是是连接点的方法就不一 定要被增强，所以可能不是切入点  

#### 通知类
通知即在切入点处执行的操作，也就是共性功能。通知类即定义通知的类。
#### 切面
切面是描述通知与切入点的对应关系。


### AOP工作流程
#### 一、Spring容器启动
Spring容器启动去加载Bean，如要被增强的类和通知类，注意此时Bean对象还没创建成功。
#### 二、读取所有切面配置中的切入点
如下：
```cpp
@PointCut("execution com.ljq.dao.BookDao.save()")
private void pt();
```
#### 三、初始化Bean
 判定bean对应的类中的方法是否匹配到任意切入点。
![](https://pic.linjq.top/img/202407091645674.png)
如果匹配失败，则创建原始对象，如UserDao(匹配失败说明它不需要增强，直接调用原始对象的方法即可)。
如果匹配成功，则创建原始对象（目标对象）的代理对象，如BookDao。

- 匹配成功说明需要对其进行增强
- 对哪个类做增强，这个类对应的对象就叫做目标对象
- 因为要对目标对象进行功能增强，而采用的技术是动态代理，所以会为其创建一个代理对象
- 最终运行的是代理对象的方法，在该方法中会对原始方法进行功能增强  
#### 四、获取Bean的执行方法
获取的bean是原始对象时，调用方法并执行，完成操作
获取的bean是代理对象时，根据代理对象的运行模式运行原始方法与增强的内容，完成操作 
### AOP切入点表达式
#### 语法
> 动作关键字(访问修饰符 返回值 包名.类/接口名.方法名(参数) 异常 名）  

方法可以是接口方法或实现类的方法
eg:
```cpp
execution(public User com.ljq.service.UserService.findById(int))
```
通常可省略访问修饰符public
#### 通配符

- "*" ：单个独立的任意符号，可以独立出现，也可以作为前缀或者后缀的匹配符出现  
```cpp
execution（public * com.itheima.*.UserService.find*(*)
```

- ".."： 多个连续的任意符号，可以独立出现，常用于简化包名与参数的书写 
```cpp
execution（public User com..UserService.findById(..))
```

- "+"： 专用于匹配子类类型（较少使用）
```cpp
execution(* *..*Service+.*(..))
```
### AOP通知类型
![](https://pic.linjq.top/img/202407091645673.png)
#### 前置通知@Before
追加功能到方法执行前,类似于在代码1或者代码2添加内容  
```cpp
@Component
@Aspect
public class MyAdvice {
    @Pointcut("execution(void com.ljq.dao.BookDao.update())")
    private void pt(){}

    @Before("pt()")
    //此处也可以写成 @Before("MyAdvice.pt()"),不建议
    public void before() {
        System.out.println("before advice ...");
    }
}
```
#### 后置通知@After
追加功能到方法执行后,不管方法执行的过程中有没有抛出异常都会执行，类似于在代码5添加内容  
```cpp
@Component
@Aspect
public class MyAdvice {
    @Pointcut("execution(void com.ljq.dao.BookDao.update())")
    private void pt(){}
    
    @After("pt()")
    public void after() {
        System.out.println("after advice ...");
    }
}

```
#### 环绕通知（重点）@Around
环绕通知功能比较强大，它可以追加功能到方法执行的前后，这也是比较常用的方式， 它可以实现其他四种通知类型的功能。
 如果我们使用环绕通知的话，要根据原始方法的返回值来设置环绕通知的返回值  
```cpp
@Component
@Aspect
public class MyAdvice {
    @Pointcut("execution(void com.ljq.dao.BookDao.update())")
    private void pt(){}

    @Around("pt()")
    public Object around(ProceedingJoinPoint pjp) throws Throwable{
        System.out.println("around before advice ...");
        //表示对原始操作的调用 
        Object ret = pjp.proceed();
        System.out.println("around after advice ...");
        return ret;
    }
}
```
#### 返回后通知（了解） @AfterReturning
追加功能到方法执行后，只有方法正常执行结束后才进行,类似于在代码3添加内容，如果方法执行抛出异常，返回后通知将不会被添加 
```cpp
@Component
@Aspect
public class MyAdvice {
    @Pointcut("execution(void com.ljq.dao.BookDao.update())")
    private void pt(){}

    @AfterReturning("pt()")
    public void afterReturning() {
        System.out.println("afterReturning advice ...");
    }
}
```
#### 抛出异常后通知（了解） @AfterThrowing
追加功能到方法抛出异常后，只有方法执行出异常才进行,类似于在代码4添加内 容，只有方法抛出异常后才会被添加 
```cpp
@Component
@Aspect
public class MyAdvice {
    @Pointcut("execution(void com.ljq.dao.BookDao.update())")
    private void pt(){}

    @AfterThrowing("pt()")
    public void afterReturning() {
        System.out.println("afterThrowing advice ...");
    }
}
```

# 实现
## 一、自定义注解
首先自定义注解@AutoFill
```cpp
/**
 * 自定义注解，用于标识某个方法需要进行功能字段自动填充处理
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AutoFill {
    //数据库操作类型：UPDATE INSERT
    OperationType value();
}

/////////////////////////////////////////////////////////////
//*********************************************************//
/////////////////////////////////////////////////////////////

/**
 * 数据库操作类型
 */
public enum OperationType {

    /**
     * 更新操作
     */
    UPDATE,

    /**
     * 插入操作
     */
    INSERT
}
```
## 二、自定义切面类
```cpp
/**
 * 自定义切面，实现公共字段自动填充处理逻辑
 */
@Aspect
@Component
@Slf4j
public class AutoFillAspect {

    /**
     * 切入点
     */
    @Pointcut("execution(* com.sky.mapper.*.*(..)) && @annotation(com.sky.annotation.AutoFill)")
    public void autoFillPointCut(){}

    /**
     * 前置通知，在通知中进行公共字段的赋值
     */
    @Before("autoFillPointCut()")
    public void autoFill(JoinPoint joinPoint){
        /////////////////////重要////////////////////////////////////
        //可先进行调试，是否能进入该方法 提前在mapper方法添加AutoFill注解
        log.info("开始进行公共字段自动填充...");
    }
}
```
完善：
```cpp
/**
 * 自定义切面，实现公共字段自动填充处理逻辑
 */
@Aspect
@Component
@Slf4j
public class AutoFillAspect {

    /**
     * 切入点
     */
    @Pointcut("execution(* com.sky.mapper.*.*(..)) && @annotation(com.sky.annotation.AutoFill)")
    public void autoFillPointCut(){}

    /**
     * 前置通知，在通知中进行公共字段的赋值
     */
    @Before("autoFillPointCut()")
    public void autoFill(JoinPoint joinPoint){
        log.info("开始进行公共字段自动填充...");

        //获取到当前被拦截的方法上的数据库操作类型
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();//方法签名对象
        AutoFill autoFill = signature.getMethod().getAnnotation(AutoFill.class);//获得方法上的注解对象
        OperationType operationType = autoFill.value();//获得数据库操作类型

        //获取到当前被拦截的方法的参数--实体对象
        Object[] args = joinPoint.getArgs();
        if(args == null || args.length == 0){
            return;
        }

        Object entity = args[0];

        //准备赋值的数据
        LocalDateTime now = LocalDateTime.now();
        Long currentId = BaseContext.getCurrentId();

        //根据当前不同的操作类型，为对应的属性通过反射来赋值
        if(operationType == OperationType.INSERT){
            //为4个公共字段赋值
            try {
                Method setCreateTime = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_CREATE_TIME, LocalDateTime.class);
                Method setCreateUser = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_CREATE_USER, Long.class);
                Method setUpdateTime = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_UPDATE_TIME, LocalDateTime.class);
                Method setUpdateUser = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_UPDATE_USER, Long.class);

                //通过反射为对象属性赋值
                setCreateTime.invoke(entity,now);
                setCreateUser.invoke(entity,currentId);
                setUpdateTime.invoke(entity,now);
                setUpdateUser.invoke(entity,currentId);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }else if(operationType == OperationType.UPDATE){
            //为2个公共字段赋值
            try {
                Method setUpdateTime = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_UPDATE_TIME, LocalDateTime.class);
                Method setUpdateUser = entity.getClass().getDeclaredMethod(AutoFillConstant.SET_UPDATE_USER, Long.class);

                //通过反射为对象属性赋值
                setUpdateTime.invoke(entity,now);
                setUpdateUser.invoke(entity,currentId);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```
## 三、在方法上加入注解
```cpp
@AutoFill(value = OperationType.UPDATE)
void update(Category category);
@AutoFill(value = OperationType.INSERT)
void insert(Category category);
```
