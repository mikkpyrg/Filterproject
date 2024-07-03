package com.example.be.controllers;

import com.example.be.constants.CriteriaSubType;
import com.example.be.constants.CriteriaType;
import com.example.be.models.Criterion;
import com.example.be.models.Filter;
import com.example.be.repositories.CriterionRepository;
import com.example.be.repositories.FilterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Stream;

@RestController
@CrossOrigin("http://localhost:3000")
public class FilterController {

    @Autowired
    private FilterRepository filterRepository;
    @Autowired
    private CriterionRepository criterionRepository;

    @GetMapping("/getAllFilters")
    public ResponseEntity<List<Filter>> getAllFilters() {
        return new ResponseEntity<>(filterRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/addUpdateFilter")
    public ResponseEntity<Filter> getAllFilters(@RequestBody Filter filter) {
        //validate
        if (filter.getName().isEmpty() || filter.getCriteria().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        for (var criterion : filter.getCriteria()) {
            var type = criterion.getType();
            var subType = criterion.getSubType();
            if (type == CriteriaType.Amount) {
                if (subType != CriteriaSubType.Equals && subType != CriteriaSubType.Less && subType != CriteriaSubType.More) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            } else if (type == CriteriaType.Date) {
                if (subType != CriteriaSubType.Equals && subType != CriteriaSubType.From && subType != CriteriaSubType.To) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
                if (criterion.getDate() == null) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            } else {
                if (subType != CriteriaSubType.Equals && subType != CriteriaSubType.EndsWith && subType != CriteriaSubType.StartsWith) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
                if (criterion.getTitle().isEmpty()) {
                    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            }
        }

        //manipulate data
        var currentFilter = filter.getId() > 0 ? filterRepository.findById(filter.getId()).get() : new Filter();

        if (!currentFilter.getName().equals(filter.getName())) {
            currentFilter.setName(filter.getName());
            currentFilter = filterRepository.save(currentFilter);
        }
        var toChangeIds = filter.getCriteria().stream().map(Criterion::getId).filter(id -> id > 0).toList();
        var currentIds = currentFilter.getCriteria().stream().map(Criterion::getId).toList();

        var toDeleteIds = currentIds.stream().filter(id -> !toChangeIds.contains(id)).toList();
        criterionRepository.deleteAllByIdInBatch(toDeleteIds);

        var toBeUpdated = new ArrayList<Criterion>();
        for (var toUpdate : filter.getCriteria().stream().filter(x -> x.getId() > 0 && currentIds.contains(x.getId())).toList()) {
            var existing = currentFilter.getCriteria().stream().filter(x -> Objects.equals(x.getId(), toUpdate.getId())).findFirst().orElseThrow();
            var date1 = existing.getDate();
            var date2 = toUpdate.getDate();
            var dateChanged = (date1 == null && date2 != null)
                    || (date1 != null && date2 == null)
                    || (date1 != null && date2 != null && date1.getTime() != date2.getTime());

            if (!existing.getType().equals(toUpdate.getType())
            || !existing.getSubType().equals(toUpdate.getSubType())
            || existing.getAmount() != toUpdate.getAmount()
            || dateChanged
            || !existing.getTitle().equals(toUpdate.getTitle())) {
                existing.setTitle(toUpdate.getTitle());
                existing.setDate(toUpdate.getDate());
                existing.setAmount(toUpdate.getAmount());
                existing.setSubType(toUpdate.getSubType());
                existing.setType(toUpdate.getType());
                toBeUpdated.add(existing);
            }
        }

        for (var toCreate : filter.getCriteria().stream().filter(x -> x.getId() <= 0).toList()) {
            toCreate.setFilter(currentFilter);
            toBeUpdated.add(toCreate);
        }

        var updated = criterionRepository.saveAll(toBeUpdated);
        var nonUpdated = currentFilter.getCriteria().stream().filter(x ->
                !toDeleteIds.contains(x.getId())
                && updated.stream().noneMatch(y -> Objects.equals(x.getId(), y.getId())) );
        var newCriteriaList = Stream.concat(nonUpdated, updated.stream())
                .sorted(Comparator.comparing(Criterion::getId))
                .toList();
        currentFilter.setCriteria(newCriteriaList);

        return new ResponseEntity<>(currentFilter, HttpStatus.OK);
    }
}
