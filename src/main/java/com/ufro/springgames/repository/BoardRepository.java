package com.ufro.springgames.repository;

import com.ufro.springgames.models.Board;
import com.ufro.springgames.models.Player;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends CrudRepository<Board, Integer> {
    List<Board> findAll();
    Board findById(int id);
    List<Board> findByPlayer_id(int playerId);
    void deleteById(int id);
}
