package com.dothereco.DotheReco.service;

import com.dothereco.DotheReco.domain.Unfixed;
import com.dothereco.DotheReco.repository.UnfixedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

@Service
public class UnfixedSortService {
    private final UnfixedRepository unfixedRepository;

    @Autowired
    public UnfixedSortService(UnfixedRepository unfixedRepository) {
        this.unfixedRepository = unfixedRepository;
    }

    // 모든 유동 스케줄 조회 및 정렬
    public List<Unfixed> getAllUnfixedSorted() {
        List<Unfixed> allUnfixed = unfixedRepository.findAll();
        PriorityQueue<Unfixed> priorityQueue = new PriorityQueue<>(new UnfixedComparator());

        for (Unfixed unfixed : allUnfixed) {
            if (!unfixed.isUnfixedCompleted()) {
                priorityQueue.add(unfixed);
            }
        }

        return priorityQueue.stream().collect(Collectors.toList());
    }

    // Comparator 정의
    public static class UnfixedComparator implements Comparator<Unfixed> {
        @Override
        public int compare(Unfixed u1, Unfixed u2) {
            int deadlineComparison = u1.getUnfixedDeadline().compareTo(u2.getUnfixedDeadline());
            if (deadlineComparison != 0) {
                return deadlineComparison;
            }
            return u1.getUnfixedImportance().compareTo(u2.getUnfixedImportance());
        }
    }

}
