class cControlMissile extends Phaser.Sprite {

     private speed; // missile speed pixels/second
     private TURN_RATE = 5; // turn rate in degrees/frame
     private yOffsetTo = -40;
     private WOBBLE_LIMIT = 8; //degress
     private WOBBLE_SPEED = 250; //miliseconds
     private wobble:number;
     private spriteTo:Phaser.Sprite

     public finish: Phaser.Signal;
 
    constructor(public game:Phaser.Game, 
        spriteFrom:Phaser.Sprite, 
        spriteTo:Phaser.Sprite,
        sprite_name:string,
        perfect_angle:boolean, 
        speed:number,
        turn_rate ) {
            super(game, spriteFrom.x, spriteFrom.y - 40);

            this.spriteTo = spriteTo;
            this.speed = speed;

            var missile = game.add.sprite(0, 0, sprite_name);
            missile.anchor.set(0.5);
            this.addChild(missile);

             this.game.physics.arcade.enable(this);

             //to inform when the animation finish
             this.finish = new Phaser.Signal();
             //lets check if we have to adjust the misile to the perfect angle of the character or not
             if (perfect_angle == true) {
                var targetAngle = Phaser.Math.angleBetween(
                    this.x, this.y,
                    this.spriteTo.x, this.spriteTo.y + this.yOffsetTo
                );

                 this.rotation = targetAngle;
             } else {
                 //lets check the orientation of the character to trow this spell 
                //if (this.controlPlayer.lastAnimation == move.idleLeft) {
                //    this.rotation = Math.PI;
                //}
             }

            // Create a variable called wobble that tweens back and forth between
            // -this.WOBBLE_LIMIT and +this.WOBBLE_LIMIT forever
            this.wobble = this.WOBBLE_LIMIT;
            this.game.add.tween(this.children[0])
                .to(
                    { angle: 360 },
                    this.WOBBLE_SPEED, Phaser.Easing.Sinusoidal.InOut, true, 0,
                    Number.POSITIVE_INFINITY, true
                );  

            //to use the update loop 
            this.game.add.existing(this);

        }

        public update() {

        var yTo = this.spriteTo.y + this.yOffsetTo
        
        var targetAngle = Phaser.Math.angleBetween(
                this.x, this.y,
                this.spriteTo.x, yTo
            );

            // Add our "wobble" factor to the targetAngle to make the missile wobble
            // Remember that this.wobble is tweening (above)
            targetAngle += Phaser.Math.degToRad(this.wobble);

            // Gradually (this.TURN_RATE) aim the missile towards the target angle
            if (this.rotation !== targetAngle) {
                // Calculate difference between the current angle and targetAngle
                var delta = targetAngle - this.rotation;

                // Keep it in range from -180 to 180 to make the most efficient turns.
                if (delta > Math.PI) delta -= Math.PI * 2;
                if (delta < -Math.PI) delta += Math.PI * 2;

                if (delta > 0) {
                    // Turn clockwise
                    this.angle += this.TURN_RATE;
                } else {
                    // Turn counter-clockwise
                    this.angle -= this.TURN_RATE;
                }

                // Just set angle to target angle if they are close
                if (Math.abs(delta) < Phaser.Math.degToRad(this.TURN_RATE)) {
                    this.rotation = targetAngle;
                }
            }

            // Calculate velocity vector based on this.rotation and this.SPEED
            this.body.velocity.x = Math.cos(this.rotation) * this.speed;
            this.body.velocity.y = Math.sin(this.rotation) * this.speed;

            //lets chech distance
            var distance = Phaser.Math.distance(this.x, this.y, this.spriteTo.x, yTo);

            if (distance < 20) {
                this.destroy();
                this.finish.dispatch();
            }
            
        }



}