package com.dothereco.DotheReco.repository;

import com.dothereco.DotheReco.domain.Place;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<Place> findByPlaceName(String name);

}
