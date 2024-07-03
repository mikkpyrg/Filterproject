package com.example.be.models;

import com.example.be.constants.CriteriaSubType;
import com.example.be.constants.CriteriaType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name="Criteria")
@Data
public class Criterion {
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id = 0L;

    private CriteriaType type;
    private CriteriaSubType subType;

    private long amount = 0;
    private String title = "";
    private Date date;

    @ManyToOne
    @JsonBackReference
    private Filter filter;
}
