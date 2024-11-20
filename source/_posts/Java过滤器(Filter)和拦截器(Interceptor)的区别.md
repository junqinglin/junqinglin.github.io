---
title: Java过滤器(Filter)和拦截器(Interceptor)的区别
auther: ljq
top_img: https://pic.linjq.top/img/top_img.jpg
cover: https://pic.linjq.top/img/default_post_cover.png
date: 2024-11-18 20:50:41
categories:
  - 后端
tags:
  - Java
mathjax: 
aside: 
description:
---
# 过滤器(Filter)
1. **基于 Servlet 规范**：
    - Filter 是 Java EE 的一部分，定义在 `javax.servlet` 包下，主要用于 Web 层。
    - 过滤器在 Servlet 容器中运行，处理所有请求和响应。
2. **适用范围**：
    - 对请求/响应的全局处理，如编码转换、日志记录、安全检查等。
    - 与 Servlet 直接交互，可以过滤静态资源和动态资源。
3. **生命周期**：
    - 由 Servlet 容器管理，随着容器的启动和销毁。

# 拦截器(Interceptor)
1. **框架级别功能**：
    - 拦截器是框架（如 Spring MVC、MyBatis 等）的概念，具体实现与框架有关。
    - 工作在方法调用的前后，或可以在控制器执行之前、之后插入逻辑。
2. **适用范围**：
    - 只对动态资源（如 Controller 方法）生效，不处理静态资源。
    - 通常用于业务逻辑层或控制层。
3. **生命周期**：
    - 由框架管理，与框架的生命周期绑定。
# 主要区别
* 归属不同：**Filter**属于**Servlet**技术，**Interceptor**属于**SpringMVC**技术
* 拦截内容不同：**Filter**对**所有**访问进行增强，Interceptor仅针对SpringMVC的访问进行增强

# 实现
## 过滤器(Filter)
继承 **`Filter`**，创建自定义过滤器：
```
import javax.servlet.*;
import java.io.IOException;

public class MyCustomFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        System.out.println("MyCustomFilter initialized");
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        System.out.println("Request passed through MyCustomFilter");
        // 手动放行(如果上面加了过滤条件，最后必须手动放行！)
        chain.doFilter(request, response); 
    }

    @Override
    public void destroy() {
        System.out.println("MyCustomFilter destroyed");
    }
}
```
使用 **`FilterRegistrationBean`** 注册过滤器:
```
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<MyCustomFilter> myFilter() {
        FilterRegistrationBean<MyCustomFilter> registrationBean = new FilterRegistrationBean<>();

        // 注册自定义过滤器
        registrationBean.setFilter(new MyCustomFilter());
        
        // 设置过滤路径
        registrationBean.addUrlPatterns("/*"); // 过滤所有请求

        // 设置优先级（值越小优先级越高）
        registrationBean.setOrder(1);

        // 设置初始化参数（可选）
        registrationBean.addInitParameter("exampleParam", "exampleValue");

        return registrationBean;
    }
}
```
## 拦截器(Interceptor)
实现框架提供的拦截器接口 **`HandlerInterceptor`**：
```
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MyInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("PreHandle: Before Controller");
        return true; // 返回 true 继续执行；返回 false 则终止请求
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView)
            throws Exception {
        System.out.println("PostHandle: After Controller but before View");
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        System.out.println("AfterCompletion: After View");
    }
}
```
注册拦截器，在 Spring 的 **`WebMvcConfigurer`** 中添加：
```
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new MyInterceptor()).addPathPatterns("/**").excludePathPatterns("/static/**");
        // 配置多拦截器
        registry.addInterceptor(new MyInterceptor2()).addPathPatterns("/**").excludePathPatterns("/static/**");
    }
}
```


