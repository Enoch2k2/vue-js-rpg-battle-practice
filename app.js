new Vue({
  el: "#vue-app",
  data: {
    characterAttacked: false,
    enemyAttacked: false,
    attackButton: true,
    characterWon: false,
    enemyWon: false,
    enemyDamage: 0,
    characterDamage: 0,
    character: {
      name: 'Enoch',
      health: 300,
      maxHealth: 300,
      attack: 30
    },
    enemy: {
      name: 'Casey',
      health: 300,
      maxHealth: 300,
      attack: 30
    }
  },
  methods: {
    attack() {
      this.characterAttacked = false;
      this.enemyAttacked = false;
      this.attackButton = false;
      setTimeout(function(){
        this.characterAttacked = true;
        this.characterDamage = this.character.attack - Math.floor(Math.random() * 20);
        this.enemy.health -= this.characterDamage;
        if (this.enemy.health <= 0) {
          this.enemy.health = 0;
          this.characterWins();
        } else if (this.character.health <= 0) {
          this.character.health = 0;
          this.enemyWins();
        } else {
          setTimeout(this.enemyAttack, 1000);
        }
      }.bind(this), 1000)
    },
    enemyAttack() {
      this.enemyAttacked = true;
      this.enemyDamage = this.enemy.attack - Math.floor(Math.random() * 20);
      this.character.health -= this.enemyDamage;
      setTimeout(function(){
        this.attackButton = true
      }.bind(this), 1000);
      
    },
    characterWins() {
      this.characterAttacked = false;
      this.enemyAttacked = false;
      this.attackButton = false;
      this.characterWon = true;
    },
    enemyWins() {
      this.characterAttacked = false;
      this.enemyAttacked = false;
      this.attackButton = false;
      this.enemyWon = true;
    },
  },
  computed: {
    getEnemyHealthPercentage() {
      return { width: this.enemy.health.toFixed(1) / this.enemy.maxHealth.toFixed(1) * 100.0 + '%'};
    },
    getCharacterHealthPercentage() {
      return { width: this.character.health.toFixed(1) / this.character.maxHealth.toFixed(1) * 100.0 + '%' };
    }
  }
});