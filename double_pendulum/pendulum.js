function doublePendulum(l_1,l_2,m_1,m_2,theta_1,theta_2) { //Constructor
    this.l_1 = l_1;
    this.l_2 = l_2;
    this.m_1 = m_1;
    this.m_2 = m_2;
    this.theta_1 = theta_1;
    this.theta_2 = theta_2;
    this.ang_vel_1 = 0; //Angular velocity
    this.ang_vel_2 = 0;

    // Methods

    this.calc_mid = function(){
        return [this.l_1*sin(this.theta_1), this.l_1*cos(this.theta_1)]
    }

    this.update_theta_1 = function(theta){
        this.theta_1 = theta;
        this.ang_vel_1 = 0;
        this.ang_vel_2 = 0;
    }

    this.update_theta_2 = function(theta){
        this.theta_2 = theta;
        this.ang_vel_1 = 0;
        this.ang_vel_2 = 0;
    }

    this.update_length_1 = function(l_1){
        this.l_1 = l_1;
        // this.ang_vel_1 = 0;
        // this.ang_vel_2 = 0;
        points = [];
    }

    this.update_length_2 = function(l_2){
        this.l_2 = l_2;
        // this.ang_vel_1 = 0;
        // this.ang_vel_2 = 0;
        points = [];
    }

    this.update_mass_1 = function(m_1){
        this.m_1 = m_1;
    }

    this.update_mass_2 = function(m_2){
        this.m_2 = m_2;
    }

    this.update = function(){
        if (!isDragging){

        // update position

        // Pendulum 1

        const numerator_1 = -1*g*(2*this.m_1+this.m_2)*sin(this.theta_1) - this.m_2*g*sin(this.theta_1-2*this.theta_2) - 2*sin(this.theta_1-this.theta_2)*this.m_2*((this.ang_vel_2*this.ang_vel_2)*this.l_2+(this.ang_vel_1*this.ang_vel_1)*this.l_1*cos(this.theta_1-this.theta_2));
        const denominator_1 = this.l_1*(2*this.m_1+this.m_2-this.m_2*cos(2*this.theta_1-2*this.theta_2));

        const ang_acc_1 = numerator_1/denominator_1;

        // Pendulum 2

        const numerator_2 = 2*sin(this.theta_1-this.theta_2)*((this.ang_vel_1*this.ang_vel_1)*this.l_1*(this.m_1+this.m_2)+g*(this.m_1+this.m_2)*cos(this.theta_1)+ (this.ang_vel_2*this.ang_vel_2)*this.l_2*this.m_2*cos(this.theta_1-this.theta_2))
        const denominator_2 = this.l_2*(2*this.m_1+this.m_2 - m_2*cos(2*this.theta_1-2*this.theta_2))
        
        const ang_acc_2 = numerator_2/denominator_2;

        this.ang_vel_1 += ang_acc_1*time_increment;
        this.ang_vel_1 -= this.ang_vel_1*dampening;
        this.theta_1 += this.ang_vel_1*time_increment;
        this.theta_1 = normalizeTheta(this.theta_1);

        this.ang_vel_2 += ang_acc_2*time_increment;
        this.ang_vel_2 -= this.ang_vel_2*dampening;
        this.theta_2 += this.ang_vel_2*time_increment;
        this.theta_2 = normalizeTheta(this.theta_2);    
    } else{
        this.adjustPosition();
    }
}

    this.draw = function(){

        // draw the pendulum
        const mid = this.calc_mid();
        push();
        strokeWeight(2);
        stroke(0, 204, 255);
        line(0,0,mid[0],mid[1]);
        line(mid[0],mid[1],mid[0]+this.l_2*sin(this.theta_2),mid[1]+this.l_2*cos(this.theta_2));
        stroke(255);
        // pendulum 1
        strokeWeight(Math.floor(1 + this.m_1/2));
        point(mid[0],mid[1]);

        // pendulum 2
        strokeWeight(Math.floor(1 + this.m_2/2));
        point(mid[0]+this.l_2*sin(this.theta_2),mid[1]+this.l_2*cos(this.theta_2));
        pop();

        if (!isDragging){
            points.push([mid[0]+this.l_2*sin(this.theta_2),mid[1]+this.l_2*cos(this.theta_2)])
        }
        
    }

    this.checkMouseDistance = function (point) {
        const mousePos = createVector(mouseX - width / 2, mouseY - height / 3);
        return p5.Vector.dist(mousePos, point) < 20; // adjust the distance as required
      };
      
      this.adjustPosition = function () {
        const mousePos = createVector(mouseX - width / 2, mouseY - height / 3);
        const mid = this.calc_mid();
        const mid_pt = createVector(mid[0], mid[1]);
        const end_pt = createVector(mid[0] + this.l_2 * sin(this.theta_2), mid[1] + this.l_2 * cos(this.theta_2));
        
        if (this.checkMouseDistance(mid_pt)) {

            angle_diff = atan2(mousePos.y,mousePos.x) - atan2(initialMousePos.y,initialMousePos.x)
            this.theta_1 = initial_theta_1 + angle_diff;

            // this.theta_1 = atan2(mousePos.y - mid.y, mousePos.x - mid.x) - PI/2;
            this.ang_vel_1 = 0; // reset the velocities to prevent sudden jumps
            this.ang_vel_2 = 0;
        } else if (this.checkMouseDistance(end_pt)) {
            this.theta_2 = atan2(mousePos.y - end_pt.y, mousePos.x - end_pt.x) - PI/2;
            this.ang_vel_1 = 0; // reset the velocities to prevent sudden jumps
            this.ang_vel_2 = 0;
        }
      };
          
}

function normalizeTheta(theta) {
    while (theta > Math.PI) {
        theta -= 2 * Math.PI;
    }
    while (theta < -Math.PI) {
        theta += 2 * Math.PI;
    }
    return theta;
  }