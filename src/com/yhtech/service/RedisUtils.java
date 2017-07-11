package com.yhtech.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;

@Component("redisUtils")
public class RedisUtils {
    Logger logger = LoggerFactory.getLogger(this.getClass());
    //操作redis客户端
    private static Jedis jedis;
    @Autowired
    @Qualifier("jedisConnectionFactory")
    private JedisConnectionFactory jedisConnectionFactory;

    /**
     * 获取一个jedis 客户端
     */
    private Jedis getJedis() {
        if (jedis == null) {
            return jedisConnectionFactory.getShardInfo().createResource();
        }
        return jedis;
    }

    private RedisUtils() {

    }

    /**
     * 添加key value 并且设置存活时间
     *
     * @param liveTime
     */
    public void set(String key, String value, int liveTime) {
        this.set(key, value);
        this.getJedis().expire(key, liveTime);
    }

    /**
     * 添加key value
     */
    public void set(String key, String value) {
        this.getJedis().set(key, value);
    }

    /**
     * 获取redis value (String)
     */
    public String get(String key) {
        String value = this.getJedis().get(key);
        return value;
    }
}
