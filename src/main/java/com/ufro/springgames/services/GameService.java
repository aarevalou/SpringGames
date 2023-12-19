package com.ufro.springgames.services;

import com.ufro.springgames.models.Board;
import com.ufro.springgames.models.Game;
import com.ufro.springgames.models.Player;
import com.ufro.springgames.repository.BoardRepository;
import com.ufro.springgames.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final BoardRepository boardRepository;

    @Autowired
    public GameService(GameRepository gameRepository, BoardRepository boardRepository) {
        this.gameRepository = gameRepository;
        this.boardRepository = boardRepository;
    }

    public List<Game> getAllGames() {
        return StreamSupport
                .stream(gameRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }


    public Game findGameByName(String gameName) {
        return gameRepository.findByGameName(gameName);
    }

    public void insertScore(Player player, Game game, int score, int attempts) {
        Board board = new Board();
        board.setPlayer_Id(player.getId());
        board.setGame_Id(game.getId());
        board.setScore(score);
        board.setAttempts(attempts);
        boardRepository.save(board);
    }

    public Game save(Game game) {
        return gameRepository.save(game);
    }

    public Game findById(int id) {
        Optional<Game> optionalGame = gameRepository.findById(id);
        return optionalGame.orElse(null);
    }


    public void deleteById(int id) {
        gameRepository.deleteById(id);
    }
}
