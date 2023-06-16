LS_BigH = {
    name: 'Big-H',
    draw_angle: 90,
    depth_offset: 0,
    trans_scaling:[0,0],
    original_length:200,
    scaling_factor:0.65,
    after_translations:[0,-300],
    after_rotation:0,
    axiom: "[F]--F",
    rules : {
        "F": "|[+F][-F]"
    },
    limit : 15
}

LS_BendBigH = {
    name: 'Bend-Big-H',
    draw_angle: 80,
    depth_offset: 0,
    trans_scaling:[0,0],
    original_length:200,
    scaling_factor:0.65,
    after_translations:[0,-320],
    after_rotation:0,
    axiom: "[F]--F",
    rules : {
        "F": "|[+F][-F]"
    },
    limit : 15
}

LS_Bush1 = {
    name: 'Bush-1',
    draw_angle: 25,
    depth_offset: 0,
    trans_scaling:[0,0],
    original_length:80,
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
    depth_offset: 0,
    trans_scaling:[0,0],
    original_length:80,
    scaling_factor:0.425,
    after_translations:[0,0],
    after_rotation:0,
    axiom: "F",
    rules : {
        "F": "F[-F]F[+F]F"
    },
    limit : 8
}

LS_Weed2 = {
    name: 'Weed-2',
    draw_angle: 25,
    depth_offset: 0,
    trans_scaling:[0,0],
    original_length:40,
    scaling_factor:0.375,
    after_translations:[0,0],
    after_rotation:0,
    axiom: "F",
    rules : {
        "F": "|[-F]|[+F]F"
    },
    limit : 10
}

LS_Carpet = {
    name: 'Carpet',
    draw_angle: 90,
    depth_offset: 0,
    trans_scaling:[3,0],
    original_length:100,
    scaling_factor:0.45,
    after_translations:[0,-20],
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
    depth_offset: 0,
    trans_scaling:[0,0],
    original_length:70,
    scaling_factor:0.425,
    after_translations:[0,-50],
    after_rotation:-Math.PI/6,
    axiom: "F++F++F",
    rules : {
        "F": "F-F++F-F"
    },
    limit : 8
}

LS_Twig = {
    name: 'Twig',
    draw_angle: 20,
    depth_offset: -1,
    trans_scaling:[0,0],
    original_length:100,
    scaling_factor:0.5,
    after_translations:[0,0],
    after_rotation:0,
    axiom: "F",
    rules : {
        "F": "|[-F][+F]"
    },
    limit : 15
}