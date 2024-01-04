console.log('Hello World!');
// game.js
let config = {
  type: Phaser.AUTO,
  width: 10000,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let player;
let platforms;
let cursors;

let game = new Phaser.Game(config);

function preload() {
  this.load.image('sky', 'assets/sky.jpg');
  this.load.image('ground', 'assets/tform.png');
  this.load.spritesheet('dude', 'assets/dudbhhe.png', { frameWidth: 32, frameHeight: 48 });
}

// game.js
// ... (le reste du code reste inchangé)
// game.js
// ... (le reste du code reste inchangé)

// game.js
// ... (le reste du code reste inchangé)

let jumpCount = 0;
const maxJumpCount = 2; // Autorise jusqu'à deux sauts
const platformHeight = 50;
const scrollSpeed = 1;

function create() {
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();

  // Génère des plateformes aléatoires
  for (let i = 0; i < 300; i++) {
    const x = Phaser.Math.Between(50, config.width - 100); // Position X aléatoire
    const y = Phaser.Math.Between(0, 1000); // Position Y espacée
    platforms.create(x, y, 'ground');
  }

  player = this.physics.add.sprite(100, 450, 'dude');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  // Ajoute une animation de mort
  this.anims.create({
    key: 'dead',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: 0
  });

  this.physics.add.collider(player, platforms, playerHit, null, this);

  cursors = this.input.keyboard.createCursorKeys();

  // Ajout de la gestion du toucher
  this.input.on('pointerdown', function(pointer) {
    // Commence à bouger à gauche
    player.setVelocityY(-160);
  });

  this.input.on('pointerup', function() {
    // Arrête de bouger lorsque le toucher est levé
    player.setVelocityY(0);

    // Touche de saut
    if (player.body.touching.down) {
      player.setVelocityY(-1000);
    }
  });
}

function update() {
  player.setVelocityX(scrollSpeed * 100); // Fait bouger le personnage constamment vers la droite

  // Double saut
  if (cursors.up.isDown && (player.body.touching.down || jumpCount < maxJumpCount)) {
    player.setVelocityY(-330);
    jumpCount++;
  }

  // Réinitialise le compteur de sauts lorsque le joueur touche le sol
  if (player.body.touching.down) {
    jumpCount = 0;
  }

  // Défilement automatique des plateformes vers la gauche
  window.scrollTo(player.x - window.innerWidth / 2, 0);
}

function playerHit(player, platform) {
  console.log("vous etes mort!")
  // Animation de mort
  document.body.innerHTML = "<h1>You're dead</h1><button>restart</button>";
  document.querySelector("button").addEventListener("click", () => {
    location.reload();
  })

  // Peut-être ajouter d'autres actions après la mort du joueur
}