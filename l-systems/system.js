LS_BigH = {
    name: 'Big-H',
    draw_angle: 90,
    trans_scaling:[0,0],
    scaling_factor:0.6,
    after_translations:[0,0],
    after_rotation:0,
    axiom: "[F]--F",
    rules : {
        "F": "|[+F][-F]"
    },
    limit : 5
}

LS_Bush1 = {
    name: 'Bush-1',
    draw_angle: 25,
    trans_scaling:[0,0],
    scaling_factor:0.575,
    after_translations:[0,0],
    after_rotation:0,
    axiom: "F",
    rules : {
        "F": "FF+[+F-F-F]-[-F+F+F]"
    },
    limit : 5
}

LS_Weed1 = {
    name: 'Weed-1',
    draw_angle: 25,
    trans_scaling:[0,0],
    scaling_factor:0.425,
    after_translations:[0,0],
    after_rotation:0,
    axiom: "F",
    rules : {
        "F": "F[-F]F[+F]F"
    },
    limit : 8
}

LS_Carpet = {
    name: 'Carpet',
    draw_angle: 90,
    trans_scaling:[3,0],
    scaling_factor:0.45,
    after_translations:[0,-50],
    after_rotation:0,
    axiom: "F-F-F-F",
    rules : {
        "F": "F[F]-F+F[--F]+F-F"
    },
    limit : 6
}

LS_Koch_Island = {
    name: 'Koch-Island',
    draw_angle: 60,
    trans_scaling:[0,0],
    scaling_factor:0.425,
    after_translations:[0,-50],
    after_rotation:-Math.PI/6,
    axiom: "F++F++F",
    rules : {
        "F": "F-F++F-F"
    },
    limit : 8
}