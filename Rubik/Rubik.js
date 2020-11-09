class Piece {
    constructor(pos) {
        this.pos = pos.slice();
        this.colors = [];
    }

    setColors() {
        if (this.pos[0] === 0) {
            this.colors.push('o');
        } else {
            this.colors.push('_');
        }

        if (this.pos[0] === 2) {
            this.colors.push('r');
        } else {
            this.colors.push('_');
        }

        if (this.pos[1] === 0) {
            this.colors.push('w');
        } else {
            this.colors.push('_');
        }

        if (this.pos[1] === 2) {
            this.colors.push('y');
        } else {
            this.colors.push('_');
        }

        if (this.pos[2] === 0) {
            this.colors.push('b');
        } else {
            this.colors.push('_');
        }

        if (this.pos[2] === 2) {
            this.colors.push('g');
        } else {
            this.colors.push('_');
        }
    }

    fill2(i) {
        switch (this.colors[i]) {
            case 'o':
                fill(1, 0.5, 0);
                break;
            case 'r':
                fill(1, 0, 0);
                break;
            case 'w':
                fill(1);
                break;
            case 'y':
                fill(1, 1, 0);
                break;
            case 'b':
                fill(0, 0, 1);
                break;
            case 'g':
                fill(0, 1, 0);
                break;
            case '_':
                fill(0);
                break;
        }
    }

    show() {
        push();
        this.fill2(0);
        rotateY(-HALF_PI);
        rect(0, 0, d, d);
        pop();

        push();
        this.fill2(1);
        translate(d, 0, 0);
        rotateY(-HALF_PI);
        rect(0, 0, d, d);
        pop();

        push();
        this.fill2(2);
        rotateX(HALF_PI);
        rect(0, 0, d, d);
        pop();

        push();
        this.fill2(3);
        translate(0, d, 0);
        rotateX(HALF_PI);
        rect(0, 0, d, d);
        pop();

        push();
        this.fill2(4);
        rect(0, 0, d, d);
        pop();

        push();
        this.fill2(5);
        translate(0, 0, d);
        rect(0, 0, d, d);
        pop();
    }

    rotR() {
        let temp = this.colors[2];
        this.colors[2] = this.colors[5];
        this.colors[5] = this.colors[3];
        this.colors[3] = this.colors[4];
        this.colors[4] = temp;
    }

    rotU() {
        let temp = this.colors[0];
        this.colors[0] = this.colors[5];
        this.colors[5] = this.colors[1];
        this.colors[1] = this.colors[4];
        this.colors[4] = temp;
    }

    rotF() {
        let temp = this.colors[0];
        this.colors[0] = this.colors[3];
        this.colors[3] = this.colors[1];
        this.colors[1] = this.colors[2];
        this.colors[2] = temp;
    }

    rotL() {
        let temp = this.colors[2];
        this.colors[2] = this.colors[4];
        this.colors[4] = this.colors[3];
        this.colors[3] = this.colors[5];
        this.colors[5] = temp;
    }

    rotD() {
        let temp = this.colors[0];
        this.colors[0] = this.colors[4];
        this.colors[4] = this.colors[1];
        this.colors[1] = this.colors[5];
        this.colors[5] = temp;
    }

    rotB() {
        let temp = this.colors[0];
        this.colors[0] = this.colors[2];
        this.colors[2] = this.colors[1];
        this.colors[1] = this.colors[3];
        this.colors[3] = temp;
    }

    R() {
        return this.colors[1];
    }

    U() {
        return this.colors[2];
    }

    F() {
        return this.colors[5];
    }

    L() {
        return this.colors[0];
    }

    D() {
        return this.colors[3];
    }

    B() {
        return this.colors[4];
    }

    clone() {
        let clone = new Piece(this.pos);
        for (let i = 0; i < 6; i++) {
            clone.colors.push(this.colors[i]);
        }
        return clone;
    }
}

class Cube {
    constructor(speed) {
        this.pieces = [];
        this.pos = [];
        for (let x = 0; x < 3; x++) {
            this.pieces.push([]);
            this.pos.push([]);
            for (let y = 0; y < 3; y++) {
                this.pieces[x].push([]);
                this.pos[x].push([]);
                for (let z = 0; z < 3; z++) {
                    this.pieces[x][y].push(new Piece([x, y, z]));
                    this.pieces[x][y][z].setColors();
                    this.pos[x][y].push([x, y, z]);
                }
            }
        }
        this.speed = speed;
        this.queue = [];
        this.method = [];
    }


    move() {
        if (this.queue.length > 0) {
            this.queue[0].a = Math.min(this.queue[0].a, this.speed);
            this.queue[0].a = this.queue[0].a - 1;
            if (this.queue[0].a <= 0) {
                switch (this.queue[0].c) {
                    case 'R':
                        this.rotR(this.queue[0].l);
                        break;
                    case 'U':
                        this.rotU(this.queue[0].l);
                        break;
                    case 'F':
                        this.rotF(this.queue[0].l);
                        break;
                    case 'L':
                        this.rotL(this.queue[0].l);
                        break;
                    case 'D':
                        this.rotD(this.queue[0].l);
                        break;
                    case 'B':
                        this.rotB(this.queue[0].l);
                        break;
                }
                this.queue.splice(0, 1);
            }
        }
    }

    moves() {
        while (this.queue.length > 0) {
            this.move();
        }
    }

    scramble(n) {
        let l = [];
        let c = floor(random(18));
        l.push(c);
        for (let i = 0; i < n - 1; i++) {
            do {
                c = floor(random(18))
            } while ((c - l[l.length - 1] + 18) % 6 === 0);
            l.push(c);
        }
        l.forEach(i => {
            switch (i) {
                case 0:
                    this.R();
                    break;
                case 1:
                    this.U();
                    break;
                case 2:
                    this.F();
                    break;
                case 3:
                    this.L();
                    break;
                case 4:
                    this.D();
                    break;
                case 5:
                    this.B();
                    break;
                case 6:
                    this.R2();
                    break;
                case 7:
                    this.U2();
                    break;
                case 8:
                    this.F2();
                    break;
                case 9:
                    this.L2();
                    break;
                case 10:
                    this.D2();
                    break;
                case 11:
                    this.B2();
                    break;
                case 12:
                    this.R_();
                    break;
                case 13:
                    this.U_();
                    break;
                case 14:
                    this.F_();
                    break;
                case 15:
                    this.L_();
                    break;
                case 16:
                    this.D_();
                    break;
                case 17:
                    this.B_();
                    break;
            }
        });
    }

    setPos(l) {
        let piece = this.pieces[l[0]][l[1]][l[2]].pos.slice();
        this.pos[piece[0]][piece[1]][piece[2]] = l.slice();
    }

    setMethod() {
        this.method = [function (c) {
            c.solve_221_0();
        }, function (c) {
            c.solve_221_1();
        }, function (c) {
            c.solve_221_2();
        }, function (c) {
            c.solve_221_3();
        }, function (c) {
            c.solve_122_0();
        }, function (c) {
            c.solve_122_1();
        }, function (c) {
            c.solve_122_2();
        }, function (c) {
            c.solve_122_3();
        }, function (c) {
            c.solve_021_0();
        }, function (c) {
            c.solve_021_1();
        }, function (c) {
            c.solve_021_2();
        }, function (c) {
            c.solve_021_3();
        }, function (c) {
            c.solve_120_0();
        }, function (c) {
            c.solve_120_1();
        }, function (c) {
            c.solve_120_2();
        }, function (c) {
            c.solve_120_3();
        }, function (c) {
            c.solve_222_0();
        }, function (c) {
            c.solve_222_1();
        }, function (c) {
            c.solve_222_2();
        }, function (c) {
            c.solve_222_3();
        }, function (c) {
            c.solve_022_0();
        }, function (c) {
            c.solve_022_1();
        }, function (c) {
            c.solve_022_2();
        }, function (c) {
            c.solve_022_3();
        }, function (c) {
            c.solve_020_0();
        }, function (c) {
            c.solve_020_1();
        }, function (c) {
            c.solve_020_2();
        }, function (c) {
            c.solve_020_3();
        }, function (c) {
            c.solve_220_0();
        }, function (c) {
            c.solve_220_1();
        }, function (c) {
            c.solve_220_2();
        }, function (c) {
            c.solve_220_3();
        }, function (c) {
            c.solve_212_0();
        }, function (c) {
            c.solve_212_1();
        }, function (c) {
            c.solve_012_0();
        }, function (c) {
            c.solve_012_1();
        }, function (c) {
            c.solve_010_0();
        }, function (c) {
            c.solve_010_1();
        }, function (c) {
            c.solve_210_0();
        }, function (c) {
            c.solve_210_1();
        }, function (c) {
            c.solve_102_0();
        }, function (c) {
            c.solve_102_1();
        }, function (c) {
            c.solve_102_2();
        }, function (c) {
            c.solve_001_0();
        }, function (c) {
            c.solve_001_1();
        }, function (c) {
            c.solve_001_2();
        }, function (c) {
            c.solve_100_0();
        }, function (c) {
            c.solve_100_1();
        }, function (c) {
            c.solve_100_2();
        }, function (c) {
            c.solve_201_0();
        }, function (c) {
            c.solve_201_1();
        }, function (c) {
            c.solve_201_2();
        }, function (c) {
            c.solve_202_0();
        }, function (c) {
            c.solve_202_1();
        }, function (c) {
            c.solve_202_2();
        }, function (c) {
            c.solve_002_0();
        }, function (c) {
            c.solve_002_1();
        }, function (c) {
            c.solve_002_2();
        }, function (c) {
            c.solve_000_0();
        }, function (c) {
            c.solve_000_1();
        }, function (c) {
            c.solve_000_2();
        }, function (c) {
            c.solve_200_0();
        }, function (c) {
            c.solve_200_1();
        }, function (c) {
            c.solve_200_2();
        }];
    }

    show() {
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                for (let z = 0; z < 3; z++) {
                    push();
                    if (this.queue.length > 0) {
                        let p = 1;
                        switch (this.queue[0].c) {
                            case 'R':
                                if (x === 2 - this.queue[0].l) {
                                    rotateX(HALF_PI * ease((1 - this.queue[0].a / this.speed), p));
                                }
                                break;
                            case 'U':
                                if (y === this.queue[0].l) {
                                    rotateY(-HALF_PI * ease((1 - this.queue[0].a / this.speed), p));
                                }
                                break;
                            case 'F':
                                if (z === 2 - this.queue[0].l) {
                                    rotateZ(HALF_PI * ease((1 - this.queue[0].a / this.speed), p));
                                }
                                break;
                            case 'L':
                                if (x === this.queue[0].l) {
                                    rotateX(-HALF_PI * ease((1 - this.queue[0].a / this.speed), p));
                                }
                                break;
                            case 'D':
                                if (y === 2 - this.queue[0].l) {
                                    rotateY(HALF_PI * ease((1 - this.queue[0].a / this.speed), p));
                                }
                                break;
                            case 'B':
                                if (z === this.queue[0].l) {
                                    rotateZ(-HALF_PI * ease((1 - this.queue[0].a / this.speed), p));
                                }
                                break;
                        }
                    }
                    translate(d * (x - 1.5), d * (y - 1.5), d * (z - 1.5));
                    this.pieces[x][y][z].show();
                    pop();
                }
            }
        }
    }

    step() {
        if (this.method.length > 0) {
            this.method[0](this);
            this.method.splice(0, 1);
        }
    }

    steps() {
        while (this.method.length > 0) {
            this.step();
            this.moves();
        }
    }


    rotR(l) {
        l = 2 - l;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.pieces[l][i][j].rotR();
            }
        }

        let temp = this.pieces[l][0][0];
        this.pieces[l][0][0] = this.pieces[l][0][2].clone();
        this.pieces[l][0][2] = this.pieces[l][2][2].clone();
        this.pieces[l][2][2] = this.pieces[l][2][0].clone();
        this.pieces[l][2][0] = temp.clone();

        temp = this.pieces[l][1][0];
        this.pieces[l][1][0] = this.pieces[l][0][1].clone();
        this.pieces[l][0][1] = this.pieces[l][1][2].clone();
        this.pieces[l][1][2] = this.pieces[l][2][1].clone();
        this.pieces[l][2][1] = temp.clone();

        this.setPos([l, 0, 0]);
        this.setPos([l, 0, 2]);
        this.setPos([l, 2, 2]);
        this.setPos([l, 2, 0]);

        this.setPos([l, 1, 0]);
        this.setPos([l, 0, 1]);
        this.setPos([l, 1, 2]);
        this.setPos([l, 2, 1]);
    }

    rotU(l) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.pieces[i][l][j].rotU();
            }
        }

        let temp = this.pieces[0][l][0];
        this.pieces[0][l][0] = this.pieces[0][l][2].clone();
        this.pieces[0][l][2] = this.pieces[2][l][2].clone();
        this.pieces[2][l][2] = this.pieces[2][l][0].clone();
        this.pieces[2][l][0] = temp.clone();

        temp = this.pieces[1][l][0];
        this.pieces[1][l][0] = this.pieces[0][l][1].clone();
        this.pieces[0][l][1] = this.pieces[1][l][2].clone();
        this.pieces[1][l][2] = this.pieces[2][l][1].clone();
        this.pieces[2][l][1] = temp.clone();

        this.setPos([0, l, 0]);
        this.setPos([0, l, 2]);
        this.setPos([2, l, 2]);
        this.setPos([2, l, 0]);

        this.setPos([1, l, 0]);
        this.setPos([0, l, 1]);
        this.setPos([1, l, 2]);
        this.setPos([2, l, 1]);
    }

    rotF(l) {
        l = 2 - l;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.pieces[i][j][l].rotF();
            }
        }

        let temp = this.pieces[0][0][l];
        this.pieces[0][0][l] = this.pieces[0][2][l].clone();
        this.pieces[0][2][l] = this.pieces[2][2][l].clone();
        this.pieces[2][2][l] = this.pieces[2][0][l].clone();
        this.pieces[2][0][l] = temp.clone();

        temp = this.pieces[1][0][l];
        this.pieces[1][0][l] = this.pieces[0][1][l].clone();
        this.pieces[0][1][l] = this.pieces[1][2][l].clone();
        this.pieces[1][2][l] = this.pieces[2][1][l].clone();
        this.pieces[2][1][l] = temp.clone();

        this.setPos([0, 0, l]);
        this.setPos([0, 2, l]);
        this.setPos([2, 2, l]);
        this.setPos([2, 0, l]);

        this.setPos([1, 0, l]);
        this.setPos([0, 1, l]);
        this.setPos([1, 2, l]);
        this.setPos([2, 1, l]);
    }

    rotL(l) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.pieces[l][i][j].rotL();
            }
        }

        let temp = this.pieces[l][0][0];
        this.pieces[l][0][0] = this.pieces[l][2][0].clone();
        this.pieces[l][2][0] = this.pieces[l][2][2].clone();
        this.pieces[l][2][2] = this.pieces[l][0][2].clone();
        this.pieces[l][0][2] = temp.clone();

        temp = this.pieces[l][1][0];
        this.pieces[l][1][0] = this.pieces[l][2][1].clone();
        this.pieces[l][2][1] = this.pieces[l][1][2].clone();
        this.pieces[l][1][2] = this.pieces[l][0][1].clone();
        this.pieces[l][0][1] = temp.clone();

        this.setPos([l, 0, 0]);
        this.setPos([l, 2, 0]);
        this.setPos([l, 2, 2]);
        this.setPos([l, 0, 2]);

        this.setPos([l, 1, 0]);
        this.setPos([l, 2, 1]);
        this.setPos([l, 1, 2]);
        this.setPos([l, 0, 1]);
    }

    rotD(l) {
        l = 2 - l;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.pieces[i][l][j].rotD();
            }
        }

        let temp = this.pieces[0][l][0];
        this.pieces[0][l][0] = this.pieces[2][l][0].clone();
        this.pieces[2][l][0] = this.pieces[2][l][2].clone();
        this.pieces[2][l][2] = this.pieces[0][l][2].clone();
        this.pieces[0][l][2] = temp.clone();

        temp = this.pieces[1][l][0];
        this.pieces[1][l][0] = this.pieces[2][l][1].clone();
        this.pieces[2][l][1] = this.pieces[1][l][2].clone();
        this.pieces[1][l][2] = this.pieces[0][l][1].clone();
        this.pieces[0][l][1] = temp.clone();

        this.setPos([0, l, 0]);
        this.setPos([2, l, 0]);
        this.setPos([2, l, 2]);
        this.setPos([0, l, 2]);

        this.setPos([1, l, 0]);
        this.setPos([2, l, 1]);
        this.setPos([1, l, 2]);
        this.setPos([0, l, 1]);
    }

    rotB(l) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.pieces[i][j][l].rotB();
            }
        }

        let temp = this.pieces[0][0][l];
        this.pieces[0][0][l] = this.pieces[2][0][l].clone();
        this.pieces[2][0][l] = this.pieces[2][2][l].clone();
        this.pieces[2][2][l] = this.pieces[0][2][l].clone();
        this.pieces[0][2][l] = temp.clone();

        temp = this.pieces[1][0][l];
        this.pieces[1][0][l] = this.pieces[2][1][l].clone();
        this.pieces[2][1][l] = this.pieces[1][2][l].clone();
        this.pieces[1][2][l] = this.pieces[0][1][l].clone();
        this.pieces[0][1][l] = temp.clone();

        this.setPos([0, 0, l]);
        this.setPos([2, 0, l]);
        this.setPos([2, 2, l]);
        this.setPos([0, 2, l]);

        this.setPos([1, 0, l]);
        this.setPos([2, 1, l]);
        this.setPos([1, 2, l]);
        this.setPos([0, 1, l]);
    }

    R(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'R', l: l, a: this.speed});
    }

    U(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'U', l: l, a: this.speed});
    }

    F(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'F', l: l, a: this.speed});
    }

    L(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'L', l: l, a: this.speed});
    }

    D(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'D', l: l, a: this.speed});
    }

    B(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'B', l: l, a: this.speed});
    }

    R2(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'R', l: l, a: this.speed});
        this.queue.push({c: 'R', l: l, a: this.speed});
    }

    U2(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'U', l: l, a: this.speed});
        this.queue.push({c: 'U', l: l, a: this.speed});
    }

    F2(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'F', l: l, a: this.speed});
        this.queue.push({c: 'F', l: l, a: this.speed});
    }

    L2(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'L', l: l, a: this.speed});
        this.queue.push({c: 'L', l: l, a: this.speed});
    }

    D2(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'D', l: l, a: this.speed});
        this.queue.push({c: 'D', l: l, a: this.speed});
    }

    B2(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'B', l: l, a: this.speed});
        this.queue.push({c: 'B', l: l, a: this.speed});
    }

    R_(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'L', l: 2 - l, a: this.speed});
    }

    U_(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'D', l: 2 - l, a: this.speed});
    }

    F_(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'B', l: 2 - l, a: this.speed});
    }

    L_(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'R', l: 2 - l, a: this.speed});
    }

    D_(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'U', l: 2 - l, a: this.speed});
    }

    B_(l) {
        if (typeof l === 'undefined') {
            l = 0;
        }
        this.queue.push({c: 'F', l: 2 - l, a: this.speed});
    }


    onR(l) {
        return l[0] === 2;
    }

    onU(l) {
        return l[1] === 0;
    }

    onF(l) {
        return l[2] === 2;
    }

    onL(l) {
        return l[0] === 0;
    }

    onD(l) {
        return l[1] === 2;
    }

    onB(l) {
        return l[2] === 0;
    }

    onX(l) {
        return l[0] === 1;
    }

    onY(l) {
        return l[1] === 1;
    }

    onZ(l) {
        return l[2] === 1;
    }


    solve_221_0() {
        let pos = this.pos[2][2][1].slice();
        if (this.onD(pos)) {
            if (this.onR(pos)) {
                this.R2();
            }
            if (this.onF(pos)) {
                this.F2();
            }
            if (this.onL(pos)) {
                this.L2();
            }
            if (this.onB(pos)) {
                this.B2();
            }
        }
        if (this.onY(pos)) {
            if (this.onR(pos)) {
                if (this.onF(pos)) {
                    this.R();
                    this.U();
                    this.R_();
                }
                if (this.onB(pos)) {
                    this.R_();
                    this.U();
                    this.R();
                }
            }
            if (this.onL(pos)) {
                if (this.onF(pos)) {
                    this.L_();
                    this.U_();
                    this.L();
                }
                if (this.onB(pos)) {
                    this.L();
                    this.U_();
                    this.L_();
                }
            }
        }
    }

    solve_221_1() {
        let pos = this.pos[2][2][1].slice();
        if (this.onR(pos)) {
            this.U();
        }
        if (this.onL(pos)) {
            this.U_();
        }
        if (this.onB(pos)) {
            this.U2();
        }
    }

    solve_221_2() {
        let pos = this.pos[2][2][1].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() !== 'y') {
            this.F();
            this.R();
            this.U_();
            this.R_();
            this.F_();
            this.U2();
        }
    }

    solve_221_3() {
        this.D_();
        this.F2();
        this.D();
    }

    solve_122_0() {
        let pos = this.pos[1][2][2].slice();
        if (this.onD(pos)) {
            if (this.onR(pos)) {
                this.R2();
            }
            if (this.onF(pos)) {
                this.F2();
            }
            if (this.onL(pos)) {
                this.L2();
            }
            if (this.onB(pos)) {
                this.B2();
            }
        }
        if (this.onY(pos)) {
            if (this.onR(pos)) {
                if (this.onF(pos)) {
                    this.R();
                    this.U();
                    this.R_();
                }
                if (this.onB(pos)) {
                    this.R_();
                    this.U();
                    this.R();
                }
            }
            if (this.onL(pos)) {
                if (this.onF(pos)) {
                    this.L_();
                    this.U_();
                    this.L();
                }
                if (this.onB(pos)) {
                    this.L();
                    this.U_();
                    this.L_();
                }
            }
        }
    }

    solve_122_1() {
        let pos = this.pos[1][2][2].slice();
        if (this.onR(pos)) {
            this.U();
        }
        if (this.onL(pos)) {
            this.U_();
        }
        if (this.onB(pos)) {
            this.U2();
        }
    }

    solve_122_2() {
        let pos = this.pos[1][2][2].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() !== 'y') {
            this.F();
            this.R();
            this.U_();
            this.R_();
            this.F_();
            this.U2();
        }
    }

    solve_122_3() {
        this.F2();
    }

    solve_021_0() {
        let pos = this.pos[0][2][1].slice();
        if (this.onD(pos)) {
            if (this.onR(pos)) {
                this.R2();
            }
            if (this.onF(pos)) {
                this.F2();
            }
            if (this.onL(pos)) {
                this.L2();
            }
            if (this.onB(pos)) {
                this.B2();
            }
        }
        if (this.onY(pos)) {
            if (this.onR(pos)) {
                if (this.onF(pos)) {
                    this.R();
                    this.U();
                    this.R_();
                }
                if (this.onB(pos)) {
                    this.R_();
                    this.U();
                    this.R();
                }
            }
            if (this.onL(pos)) {
                if (this.onF(pos)) {
                    this.L_();
                    this.U_();
                    this.L();
                }
                if (this.onB(pos)) {
                    this.L();
                    this.U_();
                    this.L_();
                }
            }
        }
    }

    solve_021_1() {
        let pos = this.pos[0][2][1].slice();
        if (this.onR(pos)) {
            this.U();
        }
        if (this.onL(pos)) {
            this.U_();
        }
        if (this.onB(pos)) {
            this.U2();
        }
    }

    solve_021_2() {
        let pos = this.pos[0][2][1].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() !== 'y') {
            this.F();
            this.R();
            this.U_();
            this.R_();
            this.F_();
            this.U2();
        }
    }

    solve_021_3() {
        this.D();
        this.F2();
        this.D_();
    }

    solve_120_0() {
        let pos = this.pos[1][2][0].slice();
        if (this.onD(pos)) {
            if (this.onR(pos)) {
                this.R2();
            }
            if (this.onF(pos)) {
                this.F2();
            }
            if (this.onL(pos)) {
                this.L2();
            }
            if (this.onB(pos)) {
                this.B2();
            }
        }
        if (this.onY(pos)) {
            if (this.onR(pos)) {
                if (this.onF(pos)) {
                    this.R();
                    this.U();
                    this.R_();
                }
                if (this.onB(pos)) {
                    this.R_();
                    this.U();
                    this.R();
                }
            }
            if (this.onL(pos)) {
                if (this.onF(pos)) {
                    this.L_();
                    this.U_();
                    this.L();
                }
                if (this.onB(pos)) {
                    this.L();
                    this.U_();
                    this.L_();
                }
            }
        }
    }

    solve_120_1() {
        let pos = this.pos[1][2][0].slice();
        if (this.onR(pos)) {
            this.U();
        }
        if (this.onL(pos)) {
            this.U_();
        }
        if (this.onB(pos)) {
            this.U2();
        }
    }

    solve_120_2() {
        let pos = this.pos[1][2][0].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() !== 'y') {
            this.F();
            this.R();
            this.U_();
            this.R_();
            this.F_();
            this.U2();
        }
    }

    solve_120_3() {
        this.D2();
        this.F2();
        this.D2();
    }


    solve_222_0() {
        let pos = this.pos[2][2][2].slice();
        if (this.onD(pos)) {
            if (this.onR(pos)) {
                if (this.onF(pos)) {
                    this.R();
                    this.U();
                    this.R_();
                }
                if (this.onB(pos)) {
                    this.R_();
                    this.U_();
                    this.R();
                }
            }
            if (this.onL(pos)) {
                if (this.onF(pos)) {
                    this.L_();
                    this.U_();
                    this.L();
                }
                if (this.onB(pos)) {
                    this.L();
                    this.U();
                    this.L_();
                }
            }
        }
    }

    solve_222_1() {
        let pos = this.pos[2][2][2].slice();
        if (this.onR(pos)) {
            if (this.onB(pos)) {
                this.U();
            }
        }
        if (this.onL(pos)) {
            if (this.onF(pos)) {
                this.U_();
            }
            if (this.onB(pos)) {
                this.U2();
            }
        }
    }

    solve_222_2() {
        let pos = this.pos[2][2][2].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.R() === 'y') {
            this.R();
            this.U();
            this.R_();
        }
        if (piece.U() === 'y') {
            this.R();
            this.U2();
            this.R_();
            this.U_();
            this.R();
            this.U();
            this.R_();
        }
        if (piece.F() === 'y') {
            this.F_();
            this.U_();
            this.F();
        }
    }

    solve_222_3() {
    }

    solve_022_0() {
        let pos = this.pos[0][2][2].slice();
        if (this.onD(pos)) {
            if (this.onR(pos)) {
                if (this.onF(pos)) {
                    this.R();
                    this.U();
                    this.R_();
                }
                if (this.onB(pos)) {
                    this.R_();
                    this.U_();
                    this.R();
                }
            }
            if (this.onL(pos)) {
                if (this.onF(pos)) {
                    this.L_();
                    this.U_();
                    this.L();
                }
                if (this.onB(pos)) {
                    this.L();
                    this.U();
                    this.L_();
                }
            }
        }
    }

    solve_022_1() {
        let pos = this.pos[0][2][2].slice();
        if (this.onR(pos)) {
            if (this.onB(pos)) {
                this.U();
            }
        }
        if (this.onL(pos)) {
            if (this.onF(pos)) {
                this.U_();
            }
            if (this.onB(pos)) {
                this.U2();
            }
        }
        this.D();
    }

    solve_022_2() {
        let pos = this.pos[0][2][2].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.R() === 'y') {
            this.R();
            this.U();
            this.R_();
        }
        if (piece.U() === 'y') {
            this.R();
            this.U2();
            this.R_();
            this.U_();
            this.R();
            this.U();
            this.R_();
        }
        if (piece.F() === 'y') {
            this.F_();
            this.U_();
            this.F();
        }
    }

    solve_022_3() {
        this.D_();
    }

    solve_020_0() {
        let pos = this.pos[0][2][0].slice();
        if (this.onD(pos)) {
            if (this.onR(pos)) {
                if (this.onF(pos)) {
                    this.R();
                    this.U();
                    this.R_();
                }
                if (this.onB(pos)) {
                    this.R_();
                    this.U_();
                    this.R();
                }
            }
            if (this.onL(pos)) {
                if (this.onF(pos)) {
                    this.L_();
                    this.U_();
                    this.L();
                }
                if (this.onB(pos)) {
                    this.L();
                    this.U();
                    this.L_();
                }
            }
        }
    }

    solve_020_1() {
        let pos = this.pos[0][2][0].slice();
        if (this.onR(pos)) {
            if (this.onB(pos)) {
                this.U();
            }
        }
        if (this.onL(pos)) {
            if (this.onF(pos)) {
                this.U_();
            }
            if (this.onB(pos)) {
                this.U2();
            }
        }
        this.D2();
    }

    solve_020_2() {
        let pos = this.pos[0][2][0].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.R() === 'y') {
            this.R();
            this.U();
            this.R_();
        }
        if (piece.U() === 'y') {
            this.R();
            this.U2();
            this.R_();
            this.U_();
            this.R();
            this.U();
            this.R_();
        }
        if (piece.F() === 'y') {
            this.F_();
            this.U_();
            this.F();
        }
    }

    solve_020_3() {
        this.D2();
    }

    solve_220_0() {
        let pos = this.pos[2][2][0].slice();
        if (this.onD(pos)) {
            if (this.onR(pos)) {
                if (this.onF(pos)) {
                    this.R();
                    this.U();
                    this.R_();
                }
                if (this.onB(pos)) {
                    this.R_();
                    this.U_();
                    this.R();
                }
            }
            if (this.onL(pos)) {
                if (this.onF(pos)) {
                    this.L_();
                    this.U_();
                    this.L();
                }
                if (this.onB(pos)) {
                    this.L();
                    this.U();
                    this.L_();
                }
            }
        }
    }

    solve_220_1() {
        let pos = this.pos[2][2][0].slice();
        if (this.onR(pos)) {
            if (this.onB(pos)) {
                this.U();
            }
        }
        if (this.onL(pos)) {
            if (this.onF(pos)) {
                this.U_();
            }
            if (this.onB(pos)) {
                this.U2();
            }
        }
        this.D_();
    }

    solve_220_2() {
        let pos = this.pos[2][2][0].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.R() === 'y') {
            this.R();
            this.U();
            this.R_();
        }
        if (piece.U() === 'y') {
            this.R();
            this.U2();
            this.R_();
            this.U_();
            this.R();
            this.U();
            this.R_();
        }
        if (piece.F() === 'y') {
            this.F_();
            this.U_();
            this.F();
        }
    }

    solve_220_3() {
        this.D();
    }


    solve_212_d() {
        this.U();
        this.R();
        this.U_();
        this.R_();
        this.U_();
        this.F_();
        this.U();
        this.F();
    }

    solve_210_d() {
        this.U_();
        this.R_();
        this.U();
        this.R();
        this.U();
        this.B();
        this.U_();
        this.B_();
    }

    solve_012_d() {
        this.U_();
        this.L_();
        this.U();
        this.L();
        this.U();
        this.F();
        this.U_();
        this.F_();
    }

    solve_010_d() {
        this.U();
        this.L();
        this.U_();
        this.L_();
        this.U_();
        this.B_();
        this.U();
        this.B();
    }

    solve_212_u() {
        this.U_();
        this.F_();
        this.U();
        this.F();
        this.U();
        this.R();
        this.U_();
        this.R_();
    }

    solve_210_u() {
        this.U();
        this.B();
        this.U_();
        this.B_();
        this.U_();
        this.R_();
        this.U();
        this.R();
    }

    solve_012_u() {
        this.U();
        this.F();
        this.U_();
        this.F_();
        this.U_();
        this.L_();
        this.U();
        this.L();
    }

    solve_010_u() {
        this.U_();
        this.B_();
        this.U();
        this.B();
        this.U();
        this.L();
        this.U_();
        this.L_();
    }


    solve_212_0() {
        let pos = this.pos[2][1][2].slice();
        if (this.onY(pos)) {
            if (this.onR(pos)) {
                if (this.onF(pos)) {
                    this.solve_212_d();
                }
                if (this.onB(pos)) {
                    this.solve_210_d();
                }
            }
            if (this.onL(pos)) {
                if (this.onF(pos)) {
                    this.solve_012_d();
                }
                if (this.onB(pos)) {
                    this.solve_010_d();
                }
            }
        }
    }

    solve_212_1() {
        let pos = this.pos[2][1][2].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() === 'r') {
            if (this.onR(pos)) {
                this.U();
            }
            if (this.onF(pos)) {
            }
            if (this.onL(pos)) {
                this.U_();
            }
            if (this.onB(pos)) {
                this.U2();
            }
            this.solve_212_d();
        }
        if (piece.U() === 'g') {
            if (this.onR(pos)) {
            }
            if (this.onF(pos)) {
                this.U_();
            }
            if (this.onL(pos)) {
                this.U2();
            }
            if (this.onB(pos)) {
                this.U();
            }
            this.solve_212_u();
        }
    }

    solve_210_0() {
        let pos = this.pos[2][1][0].slice();
        if (this.onY(pos)) {
            if (this.onR(pos)) {
                if (this.onF(pos)) {
                    this.solve_212_d();
                }
                if (this.onB(pos)) {
                    this.solve_210_d();
                }
            }
            if (this.onL(pos)) {
                if (this.onF(pos)) {
                    this.solve_012_d();
                }
                if (this.onB(pos)) {
                    this.solve_010_d();
                }
            }
        }
    }

    solve_210_1() {
        let pos = this.pos[2][1][0].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() === 'r') {
            if (this.onR(pos)) {
                this.U_();
            }
            if (this.onF(pos)) {
                this.U2();
            }
            if (this.onL(pos)) {
                this.U();
            }
            if (this.onB(pos)) {
            }
            this.solve_210_d();
        }
        if (piece.U() === 'b') {
            if (this.onR(pos)) {
            }
            if (this.onF(pos)) {
                this.U_();
            }
            if (this.onL(pos)) {
                this.U2();
            }
            if (this.onB(pos)) {
                this.U();
            }
            this.solve_210_u();
        }
    }

    solve_012_0() {
        let pos = this.pos[0][1][2].slice();
        if (this.onY(pos)) {
            if (this.onR(pos)) {
                if (this.onF(pos)) {
                    this.solve_212_d();
                }
                if (this.onB(pos)) {
                    this.solve_210_d();
                }
            }
            if (this.onL(pos)) {
                if (this.onF(pos)) {
                    this.solve_012_d();
                }
                if (this.onB(pos)) {
                    this.solve_010_d();
                }
            }
        }
    }

    solve_012_1() {
        let pos = this.pos[0][1][2].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() === 'o') {
            if (this.onR(pos)) {
                this.U();
            }
            if (this.onF(pos)) {
            }
            if (this.onL(pos)) {
                this.U_();
            }
            if (this.onB(pos)) {
                this.U2();
            }
            this.solve_012_d();
        }
        if (piece.U() === 'g') {
            if (this.onR(pos)) {
                this.U2();
            }
            if (this.onF(pos)) {
                this.U();
            }
            if (this.onL(pos)) {
            }
            if (this.onB(pos)) {
                this.U_();
            }
            this.solve_012_u();
        }
    }

    solve_010_0() {
        let pos = this.pos[0][1][0].slice();
        if (this.onY(pos)) {
            if (this.onR(pos)) {
                if (this.onF(pos)) {
                    this.solve_212_d();
                }
                if (this.onB(pos)) {
                    this.solve_210_d();
                }
            }
            if (this.onL(pos)) {
                if (this.onF(pos)) {
                    this.solve_012_d();
                }
                if (this.onB(pos)) {
                    this.solve_010_d();
                }
            }
        }
    }

    solve_010_1() {
        let pos = this.pos[0][1][0].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() === 'o') {
            if (this.onR(pos)) {
                this.U_();
            }
            if (this.onF(pos)) {
                this.U2();
            }
            if (this.onL(pos)) {
                this.U();
            }
            if (this.onB(pos)) {
            }
            this.solve_010_d();
        }
        if (piece.U() === 'b') {
            if (this.onR(pos)) {
                this.U2();
            }
            if (this.onF(pos)) {
                this.U();
            }
            if (this.onL(pos)) {
            }
            if (this.onB(pos)) {
                this.U_();
            }
            this.solve_010_u();
        }
    }


    solve_201_0() {
        let pos = this.pos[2][0][1].slice();
        if (this.onR(pos)) {
        }
        if (this.onF(pos)) {
            this.R();
            this.U();
            this.R_();
            this.F_();
            this.R();
            this.U();
            this.R_();
            this.U_();
            this.R_();
            this.F();
            this.R2();
            this.U_();
            this.R_();
            this.U_();
        }
        if (this.onL(pos)) {
            this.R();
            this.U();
            this.R_();
            this.U_();
            this.R_();
            this.F();
            this.R2();
            this.U_();
            this.R_();
            this.U_();
            this.R();
            this.U();
            this.R_();
            this.F_();

        }
        if (this.onB(pos)) {
            this.U();
            this.F_();
            this.U_();
            this.F();
            this.R();
            this.F_();
            this.U_();
            this.F();
            this.U();
            this.F();
            this.R_();
            this.F2();
            this.U();
            this.F();
        }
    }

    solve_201_1() {
        let pos = this.pos[2][0][1].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() === 'r') {
            this.R_();
            this.L();
            this.F();
            this.R_();
            this.L();
            this.D();
            this.R_();
            this.L();
            this.B();
            this.R_();
            this.L();
            this.U();
            this.R_();
            this.L();
            this.F_();
            this.R_();
            this.L();
            this.D_();
            this.R_();
            this.L();
            this.B_();
            this.R_();
            this.L();
            this.U_();
        }
    }

    solve_201_2() {
    }

    solve_102_0() {
        let pos = this.pos[1][0][2].slice();
        if (this.onR(pos)) {
        }
        if (this.onF(pos)) {
            this.R();
            this.U();
            this.R_();
            this.F_();
            this.R();
            this.U();
            this.R_();
            this.U_();
            this.R_();
            this.F();
            this.R2();
            this.U_();
            this.R_();
            this.U_();
        }
        if (this.onL(pos)) {
            this.R();
            this.U();
            this.R_();
            this.U_();
            this.R_();
            this.F();
            this.R2();
            this.U_();
            this.R_();
            this.U_();
            this.R();
            this.U();
            this.R_();
            this.F_();

        }
        if (this.onB(pos)) {
            this.U();
            this.F_();
            this.U_();
            this.F();
            this.R();
            this.F_();
            this.U_();
            this.F();
            this.U();
            this.F();
            this.R_();
            this.F2();
            this.U();
            this.F();
        }
    }

    solve_102_1() {
        let pos = this.pos[1][0][2].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() === 'g') {
            this.R_();
            this.L();
            this.F();
            this.R_();
            this.L();
            this.D();
            this.R_();
            this.L();
            this.B();
            this.R_();
            this.L();
            this.U();
            this.R_();
            this.L();
            this.F_();
            this.R_();
            this.L();
            this.D_();
            this.R_();
            this.L();
            this.B_();
            this.R_();
            this.L();
            this.U_();
        }
    }

    solve_102_2() {
        this.R();
        this.U();
        this.R_();
        this.F_();
        this.R();
        this.U();
        this.R_();
        this.U_();
        this.R_();
        this.F();
        this.R2();
        this.U_();
        this.R_();
        this.U_();
    }

    solve_001_0() {
        let pos = this.pos[0][0][1].slice();
        if (this.onR(pos)) {
        }
        if (this.onF(pos)) {
            this.R();
            this.U();
            this.R_();
            this.F_();
            this.R();
            this.U();
            this.R_();
            this.U_();
            this.R_();
            this.F();
            this.R2();
            this.U_();
            this.R_();
            this.U_();
        }
        if (this.onL(pos)) {
            this.R();
            this.U();
            this.R_();
            this.U_();
            this.R_();
            this.F();
            this.R2();
            this.U_();
            this.R_();
            this.U_();
            this.R();
            this.U();
            this.R_();
            this.F_();

        }
        if (this.onB(pos)) {
            this.U();
            this.F_();
            this.U_();
            this.F();
            this.R();
            this.F_();
            this.U_();
            this.F();
            this.U();
            this.F();
            this.R_();
            this.F2();
            this.U();
            this.F();
        }
    }

    solve_001_1() {
        let pos = this.pos[0][0][1].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() === 'o') {
            this.R_();
            this.L();
            this.F();
            this.R_();
            this.L();
            this.D();
            this.R_();
            this.L();
            this.B();
            this.R_();
            this.L();
            this.U();
            this.R_();
            this.L();
            this.F_();
            this.R_();
            this.L();
            this.D_();
            this.R_();
            this.L();
            this.B_();
            this.R_();
            this.L();
            this.U_();
        }
    }

    solve_001_2() {
        this.R();
        this.U();
        this.R_();
        this.U_();
        this.R_();
        this.F();
        this.R2();
        this.U_();
        this.R_();
        this.U_();
        this.R();
        this.U();
        this.R_();
        this.F_();
    }

    solve_100_0() {
        let pos = this.pos[1][0][0].slice();
        if (this.onR(pos)) {
        }
        if (this.onF(pos)) {
            this.R();
            this.U();
            this.R_();
            this.F_();
            this.R();
            this.U();
            this.R_();
            this.U_();
            this.R_();
            this.F();
            this.R2();
            this.U_();
            this.R_();
            this.U_();
        }
        if (this.onL(pos)) {
            this.R();
            this.U();
            this.R_();
            this.U_();
            this.R_();
            this.F();
            this.R2();
            this.U_();
            this.R_();
            this.U_();
            this.R();
            this.U();
            this.R_();
            this.F_();

        }
        if (this.onB(pos)) {
            this.U();
            this.F_();
            this.U_();
            this.F();
            this.R();
            this.F_();
            this.U_();
            this.F();
            this.U();
            this.F();
            this.R_();
            this.F2();
            this.U();
            this.F();
        }
    }

    solve_100_1() {
        let pos = this.pos[1][0][0].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() === 'b') {
            this.R_();
            this.L();
            this.F();
            this.R_();
            this.L();
            this.D();
            this.R_();
            this.L();
            this.B();
            this.R_();
            this.L();
            this.U();
            this.R_();
            this.L();
            this.F_();
            this.R_();
            this.L();
            this.D_();
            this.R_();
            this.L();
            this.B_();
            this.R_();
            this.L();
            this.U_();
        }
    }

    solve_100_2() {
        this.U();
        this.F_();
        this.U_();
        this.F();
        this.R();
        this.F_();
        this.U_();
        this.F();
        this.U();
        this.F();
        this.R_();
        this.F2();
        this.U();
        this.F();
    }


    solve_202_0() {
        let pos = this.pos[2][0][2].slice();
        if (this.onR(pos)) {
            if (this.onF(pos)) {
            }
            if (this.onB(pos)) {
                this.R();
                this.U();
                this.R_();
                this.F_();
                this.R();
                this.U();
                this.R_();
                this.U_();
                this.R_();
                this.F();
                this.R2();
                this.U_();
                this.R_();
                this.U_();
            }
        }
        if (this.onL(pos)) {
            if (this.onF(pos)) {
                this.F_();
                this.U_();
                this.F();
                this.R();
                this.F_();
                this.U_();
                this.F();
                this.U();
                this.F();
                this.R_();
                this.F2();
                this.U();
                this.F();
                this.U();
            }
            if (this.onB(pos)) {
                this.U2();
                this.F();
                this.R();
                this.U_();
                this.R_();
                this.U_();
                this.R();
                this.U();
                this.R_();
                this.F_();
                this.R();
                this.U();
                this.R_();
                this.U_();
                this.R_();
                this.F();
                this.R();
                this.F_();
                this.U2();
            }
        }
    }

    solve_202_1() {
        let pos = this.pos[2][0][2].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() === 'w') {
        }
        if (piece.R() === 'w') {
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
        }
        if (piece.F() === 'w') {
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
        }
    }

    solve_202_2() {
    }

    solve_002_0() {
        let pos = this.pos[0][0][2].slice();
        if (this.onR(pos)) {
            if (this.onF(pos)) {
            }
            if (this.onB(pos)) {
                this.R();
                this.U();
                this.R_();
                this.F_();
                this.R();
                this.U();
                this.R_();
                this.U_();
                this.R_();
                this.F();
                this.R2();
                this.U_();
                this.R_();
                this.U_();
            }
        }
        if (this.onL(pos)) {
            if (this.onF(pos)) {
                this.F_();
                this.U_();
                this.F();
                this.R();
                this.F_();
                this.U_();
                this.F();
                this.U();
                this.F();
                this.R_();
                this.F2();
                this.U();
                this.F();
                this.U();
            }
            if (this.onB(pos)) {
                this.U2();
                this.F();
                this.R();
                this.U_();
                this.R_();
                this.U_();
                this.R();
                this.U();
                this.R_();
                this.F_();
                this.R();
                this.U();
                this.R_();
                this.U_();
                this.R_();
                this.F();
                this.R();
                this.F_();
                this.U2();
            }
        }
    }

    solve_002_1() {
        let pos = this.pos[0][0][2].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() === 'w') {
        }
        if (piece.R() === 'w') {
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
        }
        if (piece.F() === 'w') {
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
        }
    }

    solve_002_2() {
        this.F_();
        this.U_();
        this.F();
        this.R();
        this.F_();
        this.U_();
        this.F();
        this.U();
        this.F();
        this.R_();
        this.F2();
        this.U();
        this.F();
        this.U();
    }

    solve_000_0() {
        let pos = this.pos[0][0][0].slice();
        if (this.onR(pos)) {
            if (this.onF(pos)) {
            }
            if (this.onB(pos)) {
                this.R();
                this.U();
                this.R_();
                this.F_();
                this.R();
                this.U();
                this.R_();
                this.U_();
                this.R_();
                this.F();
                this.R2();
                this.U_();
                this.R_();
                this.U_();
            }
        }
        if (this.onL(pos)) {
            if (this.onF(pos)) {
                this.F_();
                this.U_();
                this.F();
                this.R();
                this.F_();
                this.U_();
                this.F();
                this.U();
                this.F();
                this.R_();
                this.F2();
                this.U();
                this.F();
                this.U();
            }
            if (this.onB(pos)) {
                this.U2();
                this.F();
                this.R();
                this.U_();
                this.R_();
                this.U_();
                this.R();
                this.U();
                this.R_();
                this.F_();
                this.R();
                this.U();
                this.R_();
                this.U_();
                this.R_();
                this.F();
                this.R();
                this.F_();
                this.U2();
            }
        }
    }

    solve_000_1() {
        let pos = this.pos[0][0][0].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() === 'w') {
        }
        if (piece.R() === 'w') {
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
        }
        if (piece.F() === 'w') {
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
        }
    }

    solve_000_2() {
        this.U2();
        this.F();
        this.R();
        this.U_();
        this.R_();
        this.U_();
        this.R();
        this.U();
        this.R_();
        this.F_();
        this.R();
        this.U();
        this.R_();
        this.U_();
        this.R_();
        this.F();
        this.R();
        this.F_();
        this.U2();
    }

    solve_200_0() {
        let pos = this.pos[2][0][0].slice();
        if (this.onR(pos)) {
            if (this.onF(pos)) {
            }
            if (this.onB(pos)) {
                this.R();
                this.U();
                this.R_();
                this.F_();
                this.R();
                this.U();
                this.R_();
                this.U_();
                this.R_();
                this.F();
                this.R2();
                this.U_();
                this.R_();
                this.U_();
            }
        }
        if (this.onL(pos)) {
            if (this.onF(pos)) {
                this.F_();
                this.U_();
                this.F();
                this.R();
                this.F_();
                this.U_();
                this.F();
                this.U();
                this.F();
                this.R_();
                this.F2();
                this.U();
                this.F();
                this.U();
            }
            if (this.onB(pos)) {
                this.U2();
                this.F();
                this.R();
                this.U_();
                this.R_();
                this.U_();
                this.R();
                this.U();
                this.R_();
                this.F_();
                this.R();
                this.U();
                this.R_();
                this.U_();
                this.R_();
                this.F();
                this.R();
                this.F_();
                this.U2();
            }
        }
    }

    solve_200_1() {
        let pos = this.pos[2][0][0].slice();
        let piece = this.pieces[pos[0]][pos[1]][pos[2]].clone();
        if (piece.U() === 'w') {
        }
        if (piece.R() === 'w') {
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
        }
        if (piece.F() === 'w') {
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
            this.R_();
            this.D_();
            this.R();
            this.D();
        }
    }

    solve_200_2() {
        this.R();
        this.U();
        this.R_();
        this.F_();
        this.R();
        this.U();
        this.R_();
        this.U_();
        this.R_();
        this.F();
        this.R2();
        this.U_();
        this.R_();
        this.U_();
    }
}

let d, cube;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    colorMode(RGB, 1);
    stroke(0);
    strokeWeight(3);
    d = 100;
    cube = new Cube(6);
    let start = new Date().getTime();
    for (let i = 0; i < 1000; i++) {
        cube.scramble(20);
        cube.moves();
        cube.setMethod();
        cube.steps();
    }
    console.log(new Date().getTime() - start);
}

function draw() {
    background(0);
    transform();
    cube.show();
    cube.move();
    if (cube.queue.length === 0) {
        cube.step();
    }
}

function ease(x, p) {
    if (p === 1) {
        return x;
    }
    if (x < 0.5) {
        return pow(2 * x, p) / 2;
    }
    return 1 - pow(2 * (1 - x), p) / 2;
}

function keyPressed() {
    switch (key) {
        case 's':
            cube.scramble(40);
            cube.moves();
            break;
        case ' ':
            cube.setMethod();
            break;
        case 'x':
            break;
        case 'r':
            cube.R();
            break;
        case 'u':
            cube.U();
            break;
        case 'f':
            cube.F();
            break;
        case 'l':
            cube.L();
            break;
        case 'd':
            cube.D();
            break;
        case 'b':
            cube.B();
            break;
    }
}

function mousePressed() {
}

function transform() {
    rotateX(-map(mouseY, -height / 2, height / 2, 0, TWO_PI));
    rotateY(map(mouseX, -width / 2, width / 2, 0, TWO_PI));
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight, WEBGL);
}
