package com.ufro.springgames.repository;

import com.ufro.springgames.models.Board;
import com.ufro.springgames.models.Player;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepository extends CrudRepository<Player, Integer> {
    List<Player> findAll();
    Player findById(int id);
    Player findByUsername(String username);
    void deleteById(long id);
}

