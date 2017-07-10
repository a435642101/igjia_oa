package com.peter.util;

/**
 * 可用于作订单号 等等
 * @author TYShi
 *
 */
public class IdWorkerStandard {
	 private final long workerIdBits = 10L;
	    private final long maxWorkerId = -1L ^ (-1L << workerIdBits);
	    private final long sequenceBits = 12L;
	    private final long workerIdShift = sequenceBits;
	    private final long timestampLeftShift = sequenceBits + workerIdBits;
	    private final long sequenceMask = -1L ^ (-1L << sequenceBits);

	    private long workerId;
	    private long sequence = 0L;
	    private long lastTimestamp = -1L;

	    public IdWorkerStandard(long workerId) {
	        if (workerId > maxWorkerId || workerId < 0) {
	            throw new IllegalArgumentException(String.format("worker Id can't be greater than %d or less than 0", maxWorkerId));
	        }
	        this.workerId = workerId;
	    }

	    public synchronized long nextId() {
	        long timestamp = timeGen();
	        if (timestamp < lastTimestamp) {
	            throw new RuntimeException(String.format("Clock moved backwards.  Refusing to generate id for %d milliseconds", lastTimestamp - timestamp));
	        }
	        if (lastTimestamp == timestamp){
	            sequence = (sequence + 1) & sequenceMask;
	            if(sequence == 0){
	                timestamp = tilNextMillis(lastTimestamp);
	            }
	        }else{
	            sequence = 0L;
	            //sequence = Math.round(Math.random() * 4096);
	        }

	        lastTimestamp = timestamp;

	        return (timestamp << timestampLeftShift) | (workerId << workerIdShift) | sequence;
	    }

	    protected long tilNextMillis(long lastTimestamp) {
	        long timestamp = timeGen();
	        while (timestamp <= lastTimestamp) {
	            timestamp = timeGen();
	        }
	        return timestamp;
	    }

	    protected long timeGen(){
	        return System.currentTimeMillis();
	    }

	    public static void main(String[] args) {
	        IdWorkerStandard idWorker = new IdWorkerStandard(0);
	        for (int i = 0; i < 10; i++) {
	            long id = idWorker.nextId();
	            System.out.println(id);
	        }
	    }
}
