package org.shrtr.core.events;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.admin.Admin;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.consumer.Consumer;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;

@Configuration
@EnableConfigurationProperties(KafkaConfigurationProperties.class)
@RequiredArgsConstructor
public class KafkaConfiguration {

    private final KafkaConfigurationProperties properties;

    @Bean
    public Admin kafkaAdmin() {
        Properties props = new Properties();
        props.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, properties.getBrokers());
        Admin admin = Admin.create(props);
        return admin;

    }

    @Bean
    public Consumer<String, String> kafkaConsumer() {

        Properties props = new Properties();
        props.put("bootstrap.servers", properties.getBrokers());

        props.setProperty("group.id", "welcome-email-service");
        props.setProperty("enable.auto.commit", "true");
        props.setProperty("auto.commit.interval.ms", "1000");


        props.setProperty("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
        props.setProperty("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

        Consumer<String, String> consumer = new KafkaConsumer<>(props);
        return consumer;
    }
    @Bean
    public Producer<String, String> kafkaProducer() {

        Properties props = new Properties();
        props.put("bootstrap.servers", properties.getBrokers());
        props.put("acks", "all");
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        Producer<String, String> producer = new KafkaProducer<>(props);
        return producer;
    }
}
