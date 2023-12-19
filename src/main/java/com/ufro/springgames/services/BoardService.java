package com.ufro.springgames.services;

import com.ufro.springgames.models.Board;
import com.ufro.springgames.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    @Autowired
    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    public List<Board> findByPlayerId(int playerId) {
        return boardRepository.findByPlayer_id(playerId);
    }

    public Board save(Board board) {
        return boardRepository.save(board);
    }

    public Board findById(int id) {
        return boardRepository.findById(id);
    }

    public void deleteById(int id) {
        boardRepository.deleteById(id);
    }
}
