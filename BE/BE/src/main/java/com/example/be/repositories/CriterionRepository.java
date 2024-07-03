package com.example.be.repositories;

import com.example.be.models.Criterion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CriterionRepository  extends JpaRepository<Criterion, Long> {

}
