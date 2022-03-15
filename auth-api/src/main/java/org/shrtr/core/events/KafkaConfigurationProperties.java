package org.shrtr.core.events;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("kafka")
@Getter
@Setter
public class KafkaConfigurationProperties {

    private String brokers = "kafka:9092";
}
