package com.ufro.springgames.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "boards")
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "player_id", nullable = false)
    private int player_Id;

    @Column(name = "game_id", nullable = false)
    private int game_Id;

    @Column(name = "score", nullable = false)
    private int score;

    @Column(name = "attempts", nullable = false)
    private int attempts;

    @ManyToOne
    @JoinColumn(name = "player_id", insertable = false, updatable = false)
    private Player player;

    @ManyToOne
    @JoinColumn(name = "game_id", insertable = false, updatable = false)
    private Game game;
}
