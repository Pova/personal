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
        this.theta_1 += this.ang_vel_1*time_increment;

        this.ang_vel_2 += ang_acc_2*time_increment;
        this.theta_2 += this.ang_vel_2*time_increment*(1-dampening);
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

        points.push([mid[0]+this.l_2*sin(this.theta_2),mid[1]+this.l_2*cos(this.theta_2)])
    }

}