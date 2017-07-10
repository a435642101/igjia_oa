package com.authority;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.annotation.ElementType;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)  
@Target(ElementType.METHOD)
@Documented
public @interface Authority {
	// 默认登录验证
    AuthorityType value() default AuthorityType.LoginAuthority;
}
