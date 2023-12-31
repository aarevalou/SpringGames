package com.ufro.springgames.repository;

import com.ufro.springgames.models.Game;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends CrudRepository<Game, Integer> {
    Game findByGameName(String gameName);
}

