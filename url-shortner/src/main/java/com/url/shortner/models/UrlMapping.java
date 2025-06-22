package com.url.shortner.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.bytecode.enhance.spi.EnhancementInfo;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Data
public class UrlMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String originalUrl;
    private String shortUrl;
    private int clickCount= 0;
    private LocalDateTime createdDate;



    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    @OneToMany(mappedBy = "urlMapping")
    private List<ClickEvent> clickEvents;
}
