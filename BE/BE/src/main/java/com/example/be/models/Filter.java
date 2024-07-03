package com.example.be.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Filters")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class Filter {
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id = 0L;
    private String name = "";


    @OneToMany(mappedBy = "filter", orphanRemoval = true)
    @JsonManagedReference
    private List<Criterion> criteria = new ArrayList<>();
}
