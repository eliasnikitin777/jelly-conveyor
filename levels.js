'use strict';
// Every solution is verified using the game rules, including rigid organisms and walls.
// Budgets deliberately allow spare moves; optimality is claimed only where proven.
const ConveyorLevels = [
  {
    "size": 3,
    "moves": 5,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 2,
        "y": 0,
        "color": "green"
      },
      {
        "id": 2,
        "x": 0,
        "y": 2,
        "color": "red"
      },
      {
        "id": 3,
        "x": 2,
        "y": 2,
        "color": "red"
      }
    ],
    "solution": [
      [
        "x",
        0,
        -2
      ],
      [
        "x",
        2,
        -2
      ]
    ],
    "optimal": true,
    "name": "Первые ленты",
    "walls": [],
    "allFloorSolution": [
      [
        "x",
        null,
        -2
      ]
    ]
  },
  {
    "size": 4,
    "moves": 8,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 3,
        "y": 0,
        "color": "green"
      },
      {
        "id": 2,
        "x": 3,
        "y": 3,
        "color": "green"
      },
      {
        "id": 3,
        "x": 0,
        "y": 2,
        "color": "red"
      },
      {
        "id": 4,
        "x": 2,
        "y": 2,
        "color": "red"
      },
      {
        "id": 5,
        "x": 1,
        "y": 3,
        "color": "red"
      }
    ],
    "solution": [
      [
        "x",
        0,
        2
      ],
      [
        "y",
        2,
        2
      ],
      [
        "x",
        2,
        1
      ]
    ],
    "optimal": true,
    "name": "Три желейки",
    "walls": [],
    "allFloorSolution": [
      [
        "x",
        null,
        -3
      ],
      [
        "y",
        null,
        -3
      ]
    ]
  },
  {
    "size": 4,
    "moves": 12,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 3,
        "y": 1,
        "color": "green"
      },
      {
        "id": 2,
        "x": 1,
        "y": 3,
        "color": "green"
      },
      {
        "id": 3,
        "x": 3,
        "y": 0,
        "color": "red"
      },
      {
        "id": 4,
        "x": 1,
        "y": 1,
        "color": "red"
      },
      {
        "id": 5,
        "x": 3,
        "y": 3,
        "color": "red"
      },
      {
        "id": 6,
        "x": 0,
        "y": 2,
        "color": "blue"
      },
      {
        "id": 7,
        "x": 2,
        "y": 2,
        "color": "blue"
      },
      {
        "id": 8,
        "x": 0,
        "y": 3,
        "color": "blue"
      }
    ],
    "solution": [
      [
        "y",
        1,
        -3
      ],
      [
        "x",
        1,
        -3
      ],
      [
        "x",
        3,
        1
      ],
      [
        "y",
        3,
        -3
      ],
      [
        "x",
        0,
        -3
      ]
    ],
    "optimal": false,
    "name": "Третий цвет",
    "walls": [],
    "allFloorSolution": [
      [
        "x",
        null,
        -3
      ],
      [
        "y",
        null,
        2
      ],
      [
        "y",
        null,
        -3
      ]
    ]
  },
  {
    "size": 5,
    "moves": 16,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 4,
        "y": 0,
        "color": "green"
      },
      {
        "id": 2,
        "x": 2,
        "y": 4,
        "color": "green"
      },
      {
        "id": 3,
        "x": 0,
        "y": 3,
        "color": "green"
      },
      {
        "id": 4,
        "x": 2,
        "y": 0,
        "color": "red"
      },
      {
        "id": 5,
        "x": 0,
        "y": 2,
        "color": "red"
      },
      {
        "id": 6,
        "x": 4,
        "y": 2,
        "color": "red"
      },
      {
        "id": 7,
        "x": 1,
        "y": 4,
        "color": "red"
      },
      {
        "id": 8,
        "x": 4,
        "y": 1,
        "color": "blue"
      },
      {
        "id": 9,
        "x": 2,
        "y": 2,
        "color": "blue"
      },
      {
        "id": 10,
        "x": 3,
        "y": 3,
        "color": "blue"
      },
      {
        "id": 11,
        "x": 4,
        "y": 4,
        "color": "blue"
      }
    ],
    "solution": [
      [
        "y",
        2,
        2
      ],
      [
        "x",
        2,
        -4
      ],
      [
        "y",
        4,
        2
      ],
      [
        "y",
        0,
        2
      ],
      [
        "x",
        2,
        -4
      ],
      [
        "x",
        4,
        -4
      ],
      [
        "y",
        0,
        -4
      ]
    ],
    "optimal": false,
    "name": "Большое поле",
    "walls": [],
    "allFloorSolution": [
      [
        "y",
        null,
        -3
      ],
      [
        "y",
        null,
        2
      ],
      [
        "x",
        null,
        -4
      ],
      [
        "x",
        null,
        -4
      ],
      [
        "y",
        null,
        -4
      ]
    ]
  },
  {
    "size": 6,
    "moves": 20,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 5,
        "y": 0,
        "color": "green"
      },
      {
        "id": 2,
        "x": 2,
        "y": 3,
        "color": "green"
      },
      {
        "id": 3,
        "x": 0,
        "y": 5,
        "color": "green"
      },
      {
        "id": 4,
        "x": 2,
        "y": 0,
        "color": "red"
      },
      {
        "id": 5,
        "x": 0,
        "y": 2,
        "color": "red"
      },
      {
        "id": 6,
        "x": 5,
        "y": 3,
        "color": "red"
      },
      {
        "id": 7,
        "x": 3,
        "y": 5,
        "color": "red"
      },
      {
        "id": 8,
        "x": 4,
        "y": 0,
        "color": "blue"
      },
      {
        "id": 9,
        "x": 2,
        "y": 2,
        "color": "blue"
      },
      {
        "id": 10,
        "x": 0,
        "y": 4,
        "color": "blue"
      },
      {
        "id": 11,
        "x": 5,
        "y": 5,
        "color": "blue"
      },
      {
        "id": 12,
        "x": 5,
        "y": 1,
        "color": "orange"
      },
      {
        "id": 13,
        "x": 4,
        "y": 2,
        "color": "orange"
      },
      {
        "id": 14,
        "x": 3,
        "y": 4,
        "color": "orange"
      },
      {
        "id": 15,
        "x": 1,
        "y": 5,
        "color": "orange"
      }
    ],
    "solution": [
      [
        "x",
        2,
        3
      ],
      [
        "y",
        4,
        3
      ],
      [
        "x",
        4,
        4
      ],
      [
        "x",
        3,
        -2
      ],
      [
        "y",
        3,
        -5
      ],
      [
        "y",
        0,
        -5
      ],
      [
        "x",
        0,
        -5
      ],
      [
        "x",
        5,
        4
      ],
      [
        "y",
        5,
        -5
      ]
    ],
    "optimal": false,
    "name": "Четыре цвета",
    "walls": [],
    "allFloorSolution": [
      [
        "x",
        null,
        -3
      ],
      [
        "y",
        null,
        -5
      ],
      [
        "y",
        null,
        2
      ],
      [
        "x",
        null,
        4
      ],
      [
        "y",
        null,
        -5
      ],
      [
        "x",
        null,
        -5
      ]
    ]
  },
  {
    "name": "Объезд",
    "size": 4,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 3,
        "y": 0,
        "color": "green"
      },
      {
        "id": 2,
        "x": 3,
        "y": 3,
        "color": "green"
      },
      {
        "id": 3,
        "x": 0,
        "y": 2,
        "color": "red"
      },
      {
        "id": 4,
        "x": 2,
        "y": 2,
        "color": "red"
      },
      {
        "id": 5,
        "x": 2,
        "y": 3,
        "color": "red"
      }
    ],
    "walls": [
      {
        "x": 1,
        "y": 1
      },
      {
        "x": 2,
        "y": 1
      }
    ],
    "solution": [
      [
        "x",
        0,
        2
      ],
      [
        "y",
        3,
        -3
      ],
      [
        "x",
        2,
        -3
      ]
    ],
    "optimal": false,
    "moves": 10,
    "allFloorSolution": [
      [
        "x",
        null,
        2
      ],
      [
        "y",
        null,
        -3
      ]
    ]
  },
  {
    "name": "Две цепочки",
    "size": 5,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "green"
      },
      {
        "id": 2,
        "x": 4,
        "y": 3,
        "color": "green"
      },
      {
        "id": 3,
        "x": 4,
        "y": 4,
        "color": "green"
      },
      {
        "id": 4,
        "x": 0,
        "y": 3,
        "color": "red"
      },
      {
        "id": 5,
        "x": 0,
        "y": 4,
        "color": "red"
      },
      {
        "id": 6,
        "x": 3,
        "y": 0,
        "color": "red"
      },
      {
        "id": 7,
        "x": 4,
        "y": 0,
        "color": "red"
      }
    ],
    "walls": [
      {
        "x": 2,
        "y": 2
      }
    ],
    "solution": [
      [
        "x",
        3,
        -4
      ],
      [
        "y",
        0,
        2
      ],
      [
        "x",
        3,
        3
      ],
      [
        "y",
        3,
        -4
      ]
    ],
    "optimal": false,
    "moves": 12,
    "allFloorSolution": [
      [
        "x",
        null,
        -4
      ],
      [
        "y",
        null,
        -4
      ],
      [
        "x",
        null,
        -4
      ]
    ]
  },
  {
    "name": "Остров",
    "size": 5,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "green"
      },
      {
        "id": 2,
        "x": 4,
        "y": 4,
        "color": "green"
      },
      {
        "id": 3,
        "x": 0,
        "y": 3,
        "color": "red"
      },
      {
        "id": 4,
        "x": 0,
        "y": 4,
        "color": "red"
      },
      {
        "id": 5,
        "x": 4,
        "y": 0,
        "color": "red"
      },
      {
        "id": 6,
        "x": 2,
        "y": 4,
        "color": "blue"
      },
      {
        "id": 7,
        "x": 3,
        "y": 4,
        "color": "blue"
      },
      {
        "id": 8,
        "x": 1,
        "y": 2,
        "color": "blue"
      }
    ],
    "walls": [
      {
        "x": 2,
        "y": 1
      },
      {
        "x": 2,
        "y": 2
      },
      {
        "x": 3,
        "y": 1
      }
    ],
    "solution": [
      [
        "y",
        4,
        3
      ],
      [
        "x",
        3,
        -4
      ],
      [
        "y",
        1,
        3
      ],
      [
        "x",
        3,
        3
      ]
    ],
    "optimal": false,
    "moves": 12,
    "allFloorSolution": [
      [
        "y",
        null,
        3
      ],
      [
        "x",
        null,
        -4
      ],
      [
        "y",
        null,
        -4
      ]
    ]
  },
  {
    "name": "Поворот",
    "size": 5,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "green"
      },
      {
        "id": 2,
        "x": 1,
        "y": 4,
        "color": "green"
      },
      {
        "id": 3,
        "x": 4,
        "y": 0,
        "color": "red"
      },
      {
        "id": 4,
        "x": 4,
        "y": 1,
        "color": "red"
      },
      {
        "id": 5,
        "x": 0,
        "y": 4,
        "color": "red"
      },
      {
        "id": 6,
        "x": 2,
        "y": 2,
        "color": "blue"
      },
      {
        "id": 7,
        "x": 2,
        "y": 3,
        "color": "blue"
      },
      {
        "id": 8,
        "x": 4,
        "y": 4,
        "color": "blue"
      }
    ],
    "walls": [
      {
        "x": 1,
        "y": 1
      },
      {
        "x": 1,
        "y": 2
      },
      {
        "x": 3,
        "y": 2
      },
      {
        "x": 3,
        "y": 3
      }
    ],
    "solution": [
      [
        "x",
        4,
        -4
      ],
      [
        "x",
        4,
        1
      ],
      [
        "y",
        2,
        -4
      ],
      [
        "x",
        4,
        3
      ],
      [
        "y",
        4,
        -4
      ]
    ],
    "optimal": false,
    "moves": 14,
    "allFloorSolution": [
      [
        "x",
        null,
        -4
      ],
      [
        "y",
        null,
        -4
      ],
      [
        "x",
        null,
        1
      ],
      [
        "y",
        null,
        -4
      ],
      [
        "x",
        null,
        3
      ]
    ]
  },
  {
    "name": "Ключи",
    "size": 6,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "green"
      },
      {
        "id": 2,
        "x": 0,
        "y": 1,
        "color": "green"
      },
      {
        "id": 3,
        "x": 5,
        "y": 4,
        "color": "green"
      },
      {
        "id": 4,
        "x": 4,
        "y": 0,
        "color": "red"
      },
      {
        "id": 5,
        "x": 5,
        "y": 0,
        "color": "red"
      },
      {
        "id": 6,
        "x": 5,
        "y": 1,
        "color": "red"
      },
      {
        "id": 7,
        "x": 0,
        "y": 5,
        "color": "red"
      },
      {
        "id": 8,
        "x": 0,
        "y": 3,
        "color": "blue"
      },
      {
        "id": 9,
        "x": 0,
        "y": 4,
        "color": "blue"
      },
      {
        "id": 10,
        "x": 3,
        "y": 5,
        "color": "blue"
      },
      {
        "id": 11,
        "x": 4,
        "y": 5,
        "color": "blue"
      }
    ],
    "walls": [
      {
        "x": 2,
        "y": 2
      },
      {
        "x": 3,
        "y": 2
      },
      {
        "x": 2,
        "y": 3
      },
      {
        "x": 3,
        "y": 3
      }
    ],
    "solution": [
      [
        "x",
        4,
        -5
      ],
      [
        "x",
        5,
        -5
      ],
      [
        "y",
        1,
        -5
      ],
      [
        "x",
        5,
        5
      ],
      [
        "y",
        4,
        3
      ]
    ],
    "optimal": false,
    "moves": 16,
    "allFloorSolution": [
      [
        "x",
        null,
        -5
      ],
      [
        "y",
        null,
        1
      ],
      [
        "x",
        null,
        -5
      ],
      [
        "y",
        null,
        -5
      ],
      [
        "y",
        null,
        -5
      ]
    ]
  },
  {
    "name": "Коридоры",
    "size": 6,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "green"
      },
      {
        "id": 2,
        "x": 5,
        "y": 5,
        "color": "green"
      },
      {
        "id": 3,
        "x": 4,
        "y": 5,
        "color": "green"
      },
      {
        "id": 4,
        "x": 5,
        "y": 0,
        "color": "red"
      },
      {
        "id": 5,
        "x": 5,
        "y": 1,
        "color": "red"
      },
      {
        "id": 6,
        "x": 0,
        "y": 5,
        "color": "red"
      },
      {
        "id": 7,
        "x": 0,
        "y": 4,
        "color": "red"
      },
      {
        "id": 8,
        "x": 2,
        "y": 0,
        "color": "blue"
      },
      {
        "id": 9,
        "x": 3,
        "y": 0,
        "color": "blue"
      },
      {
        "id": 10,
        "x": 2,
        "y": 5,
        "color": "blue"
      },
      {
        "id": 11,
        "x": 3,
        "y": 5,
        "color": "blue"
      }
    ],
    "walls": [
      {
        "x": 1,
        "y": 2
      },
      {
        "x": 2,
        "y": 2
      },
      {
        "x": 3,
        "y": 2
      },
      {
        "x": 3,
        "y": 3
      }
    ],
    "solution": [
      [
        "y",
        5,
        -5
      ],
      [
        "y",
        0,
        1
      ],
      [
        "x",
        1,
        3
      ],
      [
        "y",
        5,
        3
      ],
      [
        "x",
        5,
        3
      ],
      [
        "x",
        3,
        -5
      ],
      [
        "y",
        4,
        -5
      ]
    ],
    "optimal": false,
    "moves": 20,
    "allFloorSolution": [
      [
        "x",
        null,
        -5
      ],
      [
        "y",
        null,
        -2
      ],
      [
        "x",
        null,
        -5
      ],
      [
        "y",
        null,
        3
      ],
      [
        "x",
        null,
        3
      ],
      [
        "y",
        null,
        2
      ],
      [
        "x",
        null,
        -5
      ],
      [
        "y",
        null,
        -2
      ],
      [
        "x",
        null,
        -5
      ],
      [
        "x",
        null,
        4
      ],
      [
        "y",
        null,
        5
      ],
      [
        "x",
        null,
        -5
      ]
    ]
  },
  {
    "name": "Четыре угла",
    "size": 6,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "green"
      },
      {
        "id": 2,
        "x": 4,
        "y": 3,
        "color": "green"
      },
      {
        "id": 3,
        "x": 5,
        "y": 0,
        "color": "red"
      },
      {
        "id": 4,
        "x": 5,
        "y": 1,
        "color": "red"
      },
      {
        "id": 5,
        "x": 1,
        "y": 3,
        "color": "red"
      },
      {
        "id": 6,
        "x": 0,
        "y": 5,
        "color": "blue"
      },
      {
        "id": 7,
        "x": 0,
        "y": 4,
        "color": "blue"
      },
      {
        "id": 8,
        "x": 4,
        "y": 2,
        "color": "blue"
      },
      {
        "id": 9,
        "x": 4,
        "y": 5,
        "color": "orange"
      },
      {
        "id": 10,
        "x": 5,
        "y": 5,
        "color": "orange"
      },
      {
        "id": 11,
        "x": 1,
        "y": 2,
        "color": "orange"
      }
    ],
    "walls": [
      {
        "x": 2,
        "y": 1
      },
      {
        "x": 3,
        "y": 1
      },
      {
        "x": 2,
        "y": 4
      },
      {
        "x": 3,
        "y": 4
      }
    ],
    "solution": [
      [
        "x",
        3,
        3
      ],
      [
        "y",
        4,
        1
      ],
      [
        "x",
        3,
        -5
      ],
      [
        "y",
        4,
        -5
      ],
      [
        "x",
        2,
        -5
      ],
      [
        "y",
        0,
        2
      ]
    ],
    "optimal": false,
    "moves": 20,
    "allFloorSolution": [
      [
        "y",
        null,
        -2
      ],
      [
        "x",
        null,
        3
      ],
      [
        "y",
        null,
        4
      ],
      [
        "x",
        null,
        -5
      ],
      [
        "y",
        null,
        -5
      ]
    ]
  },
  {
    "name": "В обход",
    "size": 7,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "green"
      },
      {
        "id": 2,
        "x": 0,
        "y": 1,
        "color": "green"
      },
      {
        "id": 3,
        "x": 6,
        "y": 5,
        "color": "green"
      },
      {
        "id": 4,
        "x": 5,
        "y": 0,
        "color": "red"
      },
      {
        "id": 5,
        "x": 6,
        "y": 0,
        "color": "red"
      },
      {
        "id": 6,
        "x": 6,
        "y": 1,
        "color": "red"
      },
      {
        "id": 7,
        "x": 0,
        "y": 6,
        "color": "red"
      },
      {
        "id": 8,
        "x": 0,
        "y": 4,
        "color": "blue"
      },
      {
        "id": 9,
        "x": 0,
        "y": 5,
        "color": "blue"
      },
      {
        "id": 10,
        "x": 3,
        "y": 6,
        "color": "blue"
      },
      {
        "id": 11,
        "x": 4,
        "y": 6,
        "color": "blue"
      },
      {
        "id": 12,
        "x": 3,
        "y": 0,
        "color": "orange"
      },
      {
        "id": 13,
        "x": 3,
        "y": 1,
        "color": "orange"
      },
      {
        "id": 14,
        "x": 5,
        "y": 5,
        "color": "orange"
      },
      {
        "id": 15,
        "x": 6,
        "y": 6,
        "color": "orange"
      }
    ],
    "walls": [
      {
        "x": 2,
        "y": 2
      },
      {
        "x": 3,
        "y": 2
      },
      {
        "x": 4,
        "y": 2
      },
      {
        "x": 2,
        "y": 3
      },
      {
        "x": 4,
        "y": 3
      }
    ],
    "solution": [
      [
        "y",
        6,
        -2
      ],
      [
        "x",
        5,
        3
      ],
      [
        "x",
        6,
        5
      ],
      [
        "y",
        5,
        -6
      ],
      [
        "y",
        6,
        -6
      ],
      [
        "x",
        0,
        3
      ],
      [
        "x",
        0,
        -6
      ]
    ],
    "optimal": false,
    "moves": 22,
    "allFloorSolution": [
      [
        "x",
        null,
        4
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "y",
        null,
        -6
      ]
    ]
  },
  {
    "name": "Архипелаг",
    "size": 7,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "green"
      },
      {
        "id": 2,
        "x": 6,
        "y": 5,
        "color": "green"
      },
      {
        "id": 3,
        "x": 6,
        "y": 6,
        "color": "green"
      },
      {
        "id": 4,
        "x": 5,
        "y": 0,
        "color": "red"
      },
      {
        "id": 5,
        "x": 6,
        "y": 0,
        "color": "red"
      },
      {
        "id": 6,
        "x": 0,
        "y": 5,
        "color": "red"
      },
      {
        "id": 7,
        "x": 0,
        "y": 6,
        "color": "red"
      },
      {
        "id": 8,
        "x": 2,
        "y": 0,
        "color": "blue"
      },
      {
        "id": 9,
        "x": 3,
        "y": 0,
        "color": "blue"
      },
      {
        "id": 10,
        "x": 3,
        "y": 6,
        "color": "blue"
      },
      {
        "id": 11,
        "x": 4,
        "y": 6,
        "color": "blue"
      },
      {
        "id": 12,
        "x": 0,
        "y": 3,
        "color": "orange"
      },
      {
        "id": 13,
        "x": 0,
        "y": 4,
        "color": "orange"
      },
      {
        "id": 14,
        "x": 6,
        "y": 2,
        "color": "orange"
      },
      {
        "id": 15,
        "x": 6,
        "y": 3,
        "color": "orange"
      }
    ],
    "walls": [
      {
        "x": 1,
        "y": 2
      },
      {
        "x": 2,
        "y": 2
      },
      {
        "x": 4,
        "y": 1
      },
      {
        "x": 4,
        "y": 2
      },
      {
        "x": 2,
        "y": 4
      },
      {
        "x": 3,
        "y": 4
      },
      {
        "x": 5,
        "y": 4
      }
    ],
    "solution": [
      [
        "y",
        0,
        -6
      ],
      [
        "x",
        6,
        -6
      ],
      [
        "y",
        6,
        3
      ],
      [
        "x",
        3,
        -6
      ],
      [
        "y",
        0,
        -6
      ],
      [
        "x",
        5,
        -6
      ],
      [
        "x",
        3,
        1
      ],
      [
        "y",
        0,
        2
      ],
      [
        "x",
        3,
        4
      ],
      [
        "y",
        0,
        -6
      ],
      [
        "y",
        5,
        -6
      ],
      [
        "x",
        0,
        -6
      ]
    ],
    "optimal": false,
    "moves": 30,
    "allFloorSolution": [
      [
        "y",
        null,
        2
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "y",
        null,
        2
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "x",
        null,
        3
      ],
      [
        "y",
        null,
        4
      ],
      [
        "x",
        null,
        4
      ],
      [
        "y",
        null,
        -6
      ]
    ]
  },
  {
    "name": "Большие организмы",
    "size": 7,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "green"
      },
      {
        "id": 2,
        "x": 0,
        "y": 1,
        "color": "green"
      },
      {
        "id": 3,
        "x": 6,
        "y": 5,
        "color": "green"
      },
      {
        "id": 4,
        "x": 6,
        "y": 6,
        "color": "green"
      },
      {
        "id": 5,
        "x": 5,
        "y": 0,
        "color": "red"
      },
      {
        "id": 6,
        "x": 6,
        "y": 0,
        "color": "red"
      },
      {
        "id": 7,
        "x": 6,
        "y": 1,
        "color": "red"
      },
      {
        "id": 8,
        "x": 0,
        "y": 5,
        "color": "red"
      },
      {
        "id": 9,
        "x": 0,
        "y": 6,
        "color": "red"
      },
      {
        "id": 10,
        "x": 2,
        "y": 0,
        "color": "blue"
      },
      {
        "id": 11,
        "x": 3,
        "y": 0,
        "color": "blue"
      },
      {
        "id": 12,
        "x": 3,
        "y": 1,
        "color": "blue"
      },
      {
        "id": 13,
        "x": 3,
        "y": 6,
        "color": "blue"
      },
      {
        "id": 14,
        "x": 4,
        "y": 6,
        "color": "blue"
      },
      {
        "id": 15,
        "x": 0,
        "y": 3,
        "color": "orange"
      },
      {
        "id": 16,
        "x": 0,
        "y": 4,
        "color": "orange"
      },
      {
        "id": 17,
        "x": 1,
        "y": 4,
        "color": "orange"
      },
      {
        "id": 18,
        "x": 6,
        "y": 2,
        "color": "orange"
      },
      {
        "id": 19,
        "x": 6,
        "y": 3,
        "color": "orange"
      }
    ],
    "walls": [
      {
        "x": 2,
        "y": 2
      },
      {
        "x": 3,
        "y": 2
      },
      {
        "x": 4,
        "y": 2
      },
      {
        "x": 2,
        "y": 3
      },
      {
        "x": 4,
        "y": 3
      },
      {
        "x": 2,
        "y": 4
      },
      {
        "x": 4,
        "y": 4
      }
    ],
    "solution": [
      [
        "x",
        6,
        3
      ],
      [
        "y",
        3,
        -6
      ],
      [
        "x",
        6,
        -1
      ],
      [
        "y",
        5,
        -3
      ],
      [
        "y",
        6,
        3
      ],
      [
        "y",
        0,
        1
      ],
      [
        "x",
        6,
        -6
      ],
      [
        "y",
        3,
        2
      ],
      [
        "x",
        6,
        3
      ],
      [
        "y",
        5,
        2
      ],
      [
        "y",
        0,
        4
      ],
      [
        "x",
        6,
        3
      ],
      [
        "y",
        5,
        -6
      ],
      [
        "x",
        0,
        -6
      ]
    ],
    "optimal": false,
    "moves": 34,
    "allFloorSolution": [
      [
        "x",
        null,
        3
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "x",
        null,
        -3
      ],
      [
        "y",
        null,
        2
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "x",
        null,
        4
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "x",
        null,
        1
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "y",
        null,
        5
      ],
      [
        "x",
        null,
        3
      ],
      [
        "y",
        null,
        3
      ],
      [
        "x",
        null,
        -6
      ]
    ]
  },
  {
    "size": 5,
    "cells": [
      {
        "x": 0,
        "y": 3,
        "color": "green",
        "id": 0
      },
      {
        "x": 0,
        "y": 2,
        "color": "green",
        "id": 1
      },
      {
        "x": 0,
        "y": 1,
        "color": "green",
        "id": 2
      },
      {
        "x": 3,
        "y": 2,
        "color": "green",
        "id": 3
      },
      {
        "x": 2,
        "y": 4,
        "color": "green",
        "id": 4
      },
      {
        "x": 1,
        "y": 4,
        "color": "red",
        "id": 5
      },
      {
        "x": 1,
        "y": 3,
        "color": "red",
        "id": 6
      },
      {
        "x": 1,
        "y": 2,
        "color": "red",
        "id": 7
      },
      {
        "x": 3,
        "y": 4,
        "color": "red",
        "id": 8
      },
      {
        "x": 3,
        "y": 0,
        "color": "red",
        "id": 9
      }
    ],
    "walls": [
      {
        "x": 2,
        "y": 2
      }
    ],
    "name": "Бублик",
    "moves": 24,
    "solution": [
      [
        "y",
        3,
        -1
      ],
      [
        "x",
        3,
        -4
      ],
      [
        "y",
        3,
        3
      ],
      [
        "x",
        4,
        -4
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        -4
      ],
      [
        "x",
        null,
        -4
      ],
      [
        "y",
        null,
        -4
      ],
      [
        "x",
        null,
        -4
      ]
    ],
    "optimal": false,
    "authorSeed": 16393
  },
  {
    "size": 6,
    "cells": [
      {
        "x": 2,
        "y": 5,
        "color": "green",
        "id": 0
      },
      {
        "x": 3,
        "y": 5,
        "color": "green",
        "id": 1
      },
      {
        "x": 1,
        "y": 5,
        "color": "green",
        "id": 2
      },
      {
        "x": 3,
        "y": 0,
        "color": "green",
        "id": 3
      },
      {
        "x": 5,
        "y": 2,
        "color": "green",
        "id": 4
      },
      {
        "x": 1,
        "y": 2,
        "color": "red",
        "id": 5
      },
      {
        "x": 0,
        "y": 2,
        "color": "red",
        "id": 6
      },
      {
        "x": 0,
        "y": 3,
        "color": "red",
        "id": 7
      },
      {
        "x": 0,
        "y": 5,
        "color": "red",
        "id": 8
      },
      {
        "x": 5,
        "y": 0,
        "color": "red",
        "id": 9
      },
      {
        "x": 0,
        "y": 4,
        "color": "blue",
        "id": 10
      },
      {
        "x": 1,
        "y": 4,
        "color": "blue",
        "id": 11
      },
      {
        "x": 1,
        "y": 3,
        "color": "blue",
        "id": 12
      },
      {
        "x": 0,
        "y": 0,
        "color": "blue",
        "id": 13
      },
      {
        "x": 4,
        "y": 2,
        "color": "blue",
        "id": 14
      }
    ],
    "walls": [
      {
        "x": 1,
        "y": 1
      },
      {
        "x": 3,
        "y": 1
      },
      {
        "x": 2,
        "y": 3
      },
      {
        "x": 4,
        "y": 3
      }
    ],
    "name": "Шахматные острова",
    "moves": 27,
    "solution": [
      [
        "x",
        0,
        -5
      ],
      [
        "y",
        2,
        2
      ],
      [
        "x",
        0,
        4
      ],
      [
        "y",
        5,
        4
      ],
      [
        "x",
        5,
        -5
      ],
      [
        "y",
        4,
        1
      ],
      [
        "x",
        2,
        1
      ],
      [
        "y",
        5,
        3
      ],
      [
        "x",
        5,
        -5
      ],
      [
        "y",
        0,
        -5
      ]
    ],
    "allFloorSolution": [
      [
        "x",
        null,
        2
      ],
      [
        "y",
        null,
        2
      ],
      [
        "x",
        null,
        -5
      ],
      [
        "x",
        null,
        1
      ],
      [
        "y",
        null,
        2
      ],
      [
        "x",
        null,
        2
      ],
      [
        "y",
        null,
        -2
      ],
      [
        "x",
        null,
        -5
      ]
    ],
    "optimal": false,
    "authorSeed": 17140
  },
  {
    "size": 6,
    "cells": [
      {
        "x": 1,
        "y": 1,
        "color": "green",
        "id": 0
      },
      {
        "x": 0,
        "y": 1,
        "color": "green",
        "id": 1
      },
      {
        "x": 1,
        "y": 2,
        "color": "green",
        "id": 2
      },
      {
        "x": 1,
        "y": 4,
        "color": "green",
        "id": 3
      },
      {
        "x": 5,
        "y": 4,
        "color": "green",
        "id": 4
      },
      {
        "x": 2,
        "y": 5,
        "color": "red",
        "id": 5
      },
      {
        "x": 3,
        "y": 5,
        "color": "red",
        "id": 6
      },
      {
        "x": 4,
        "y": 5,
        "color": "red",
        "id": 7
      },
      {
        "x": 4,
        "y": 2,
        "color": "red",
        "id": 8
      },
      {
        "x": 2,
        "y": 3,
        "color": "red",
        "id": 9
      },
      {
        "x": 0,
        "y": 0,
        "color": "blue",
        "id": 10
      },
      {
        "x": 1,
        "y": 0,
        "color": "blue",
        "id": 11
      },
      {
        "x": 2,
        "y": 0,
        "color": "blue",
        "id": 12
      },
      {
        "x": 0,
        "y": 4,
        "color": "blue",
        "id": 13
      },
      {
        "x": 5,
        "y": 5,
        "color": "blue",
        "id": 14
      }
    ],
    "walls": [
      {
        "x": 2,
        "y": 1
      },
      {
        "x": 2,
        "y": 2
      },
      {
        "x": 2,
        "y": 4
      }
    ],
    "name": "Две двери",
    "moves": 24,
    "solution": [
      [
        "x",
        3,
        3
      ],
      [
        "y",
        5,
        -1
      ],
      [
        "x",
        3,
        -4
      ],
      [
        "y",
        5,
        2
      ],
      [
        "x",
        5,
        -5
      ],
      [
        "y",
        0,
        -5
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        2
      ],
      [
        "y",
        null,
        -1
      ],
      [
        "x",
        null,
        3
      ],
      [
        "x",
        null,
        -5
      ],
      [
        "y",
        null,
        -5
      ]
    ],
    "optimal": false,
    "authorSeed": 18018
  },
  {
    "size": 6,
    "cells": [
      {
        "x": 2,
        "y": 3,
        "color": "green",
        "id": 0
      },
      {
        "x": 2,
        "y": 2,
        "color": "green",
        "id": 1
      },
      {
        "x": 3,
        "y": 3,
        "color": "green",
        "id": 2
      },
      {
        "x": 5,
        "y": 5,
        "color": "green",
        "id": 3
      },
      {
        "x": 4,
        "y": 0,
        "color": "green",
        "id": 4
      },
      {
        "x": 2,
        "y": 1,
        "color": "red",
        "id": 5
      },
      {
        "x": 3,
        "y": 1,
        "color": "red",
        "id": 6
      },
      {
        "x": 3,
        "y": 0,
        "color": "red",
        "id": 7
      },
      {
        "x": 2,
        "y": 5,
        "color": "red",
        "id": 8
      },
      {
        "x": 5,
        "y": 3,
        "color": "red",
        "id": 9
      },
      {
        "x": 1,
        "y": 5,
        "color": "blue",
        "id": 10
      },
      {
        "x": 0,
        "y": 5,
        "color": "blue",
        "id": 11
      },
      {
        "x": 0,
        "y": 4,
        "color": "blue",
        "id": 12
      },
      {
        "x": 1,
        "y": 0,
        "color": "blue",
        "id": 13
      },
      {
        "x": 5,
        "y": 1,
        "color": "blue",
        "id": 14
      }
    ],
    "walls": [
      {
        "x": 1,
        "y": 2
      },
      {
        "x": 4,
        "y": 2
      },
      {
        "x": 1,
        "y": 3
      },
      {
        "x": 4,
        "y": 3
      },
      {
        "x": 1,
        "y": 4
      },
      {
        "x": 2,
        "y": 4
      },
      {
        "x": 3,
        "y": 4
      },
      {
        "x": 4,
        "y": 4
      }
    ],
    "name": "Подкова",
    "moves": 31,
    "solution": [
      [
        "x",
        0,
        -1
      ],
      [
        "y",
        0,
        3
      ],
      [
        "y",
        3,
        2
      ],
      [
        "x",
        1,
        -5
      ],
      [
        "y",
        5,
        -5
      ],
      [
        "x",
        1,
        -5
      ],
      [
        "x",
        0,
        -5
      ],
      [
        "x",
        5,
        3
      ],
      [
        "y",
        5,
        -5
      ],
      [
        "x",
        0,
        -5
      ],
      [
        "x",
        1,
        -5
      ],
      [
        "y",
        0,
        1
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        -2
      ],
      [
        "x",
        null,
        -1
      ],
      [
        "y",
        null,
        3
      ],
      [
        "y",
        null,
        -4
      ],
      [
        "x",
        null,
        -5
      ],
      [
        "x",
        null,
        3
      ],
      [
        "y",
        null,
        -5
      ],
      [
        "x",
        null,
        -5
      ],
      [
        "y",
        null,
        2
      ]
    ],
    "optimal": false,
    "authorSeed": 19027
  },
  {
    "size": 7,
    "cells": [
      {
        "x": 0,
        "y": 0,
        "color": "green",
        "id": 0
      },
      {
        "x": 1,
        "y": 0,
        "color": "green",
        "id": 1
      },
      {
        "x": 1,
        "y": 1,
        "color": "green",
        "id": 2
      },
      {
        "x": 2,
        "y": 0,
        "color": "green",
        "id": 3
      },
      {
        "x": 5,
        "y": 5,
        "color": "green",
        "id": 4
      },
      {
        "x": 0,
        "y": 6,
        "color": "green",
        "id": 5
      },
      {
        "x": 1,
        "y": 5,
        "color": "red",
        "id": 6
      },
      {
        "x": 1,
        "y": 6,
        "color": "red",
        "id": 7
      },
      {
        "x": 2,
        "y": 5,
        "color": "red",
        "id": 8
      },
      {
        "x": 3,
        "y": 5,
        "color": "red",
        "id": 9
      },
      {
        "x": 4,
        "y": 2,
        "color": "red",
        "id": 10
      },
      {
        "x": 3,
        "y": 3,
        "color": "red",
        "id": 11
      }
    ],
    "walls": [
      {
        "x": 0,
        "y": 1
      },
      {
        "x": 6,
        "y": 1
      },
      {
        "x": 0,
        "y": 2
      },
      {
        "x": 1,
        "y": 2
      },
      {
        "x": 5,
        "y": 2
      },
      {
        "x": 6,
        "y": 2
      },
      {
        "x": 0,
        "y": 3
      },
      {
        "x": 1,
        "y": 3
      },
      {
        "x": 2,
        "y": 3
      },
      {
        "x": 4,
        "y": 3
      },
      {
        "x": 5,
        "y": 3
      },
      {
        "x": 6,
        "y": 3
      },
      {
        "x": 0,
        "y": 4
      },
      {
        "x": 1,
        "y": 4
      },
      {
        "x": 5,
        "y": 4
      },
      {
        "x": 6,
        "y": 4
      },
      {
        "x": 0,
        "y": 5
      },
      {
        "x": 6,
        "y": 5
      }
    ],
    "name": "Песочные часы",
    "moves": 24,
    "solution": [
      [
        "x",
        2,
        -1
      ],
      [
        "y",
        3,
        1
      ],
      [
        "x",
        6,
        5
      ],
      [
        "x",
        5,
        -2
      ],
      [
        "y",
        3,
        -6
      ]
    ],
    "allFloorSolution": [
      [
        "x",
        null,
        -1
      ],
      [
        "y",
        null,
        1
      ],
      [
        "y",
        null,
        -1
      ],
      [
        "x",
        null,
        5
      ],
      [
        "x",
        null,
        -2
      ],
      [
        "y",
        null,
        -6
      ]
    ],
    "optimal": false,
    "authorSeed": 20036
  },
  {
    "size": 6,
    "cells": [
      {
        "x": 1,
        "y": 2,
        "color": "green",
        "id": 0
      },
      {
        "x": 0,
        "y": 2,
        "color": "green",
        "id": 1
      },
      {
        "x": 0,
        "y": 3,
        "color": "green",
        "id": 2
      },
      {
        "x": 2,
        "y": 4,
        "color": "green",
        "id": 3
      },
      {
        "x": 3,
        "y": 0,
        "color": "green",
        "id": 4
      },
      {
        "x": 0,
        "y": 1,
        "color": "red",
        "id": 5
      },
      {
        "x": 0,
        "y": 0,
        "color": "red",
        "id": 6
      },
      {
        "x": 1,
        "y": 0,
        "color": "red",
        "id": 7
      },
      {
        "x": 1,
        "y": 3,
        "color": "red",
        "id": 8
      },
      {
        "x": 0,
        "y": 4,
        "color": "red",
        "id": 9
      },
      {
        "x": 5,
        "y": 2,
        "color": "blue",
        "id": 10
      },
      {
        "x": 4,
        "y": 2,
        "color": "blue",
        "id": 11
      },
      {
        "x": 4,
        "y": 3,
        "color": "blue",
        "id": 12
      },
      {
        "x": 4,
        "y": 5,
        "color": "blue",
        "id": 13
      },
      {
        "x": 4,
        "y": 0,
        "color": "blue",
        "id": 14
      }
    ],
    "walls": [
      {
        "x": 1,
        "y": 1
      },
      {
        "x": 2,
        "y": 2
      },
      {
        "x": 3,
        "y": 3
      },
      {
        "x": 4,
        "y": 4
      }
    ],
    "name": "Лестница",
    "moves": 26,
    "solution": [
      [
        "x",
        5,
        1
      ],
      [
        "y",
        5,
        -5
      ],
      [
        "x",
        0,
        2
      ],
      [
        "y",
        5,
        5
      ],
      [
        "x",
        5,
        -3
      ],
      [
        "y",
        1,
        2
      ],
      [
        "x",
        5,
        -5
      ],
      [
        "y",
        1,
        -5
      ],
      [
        "y",
        0,
        -5
      ]
    ],
    "allFloorSolution": [
      [
        "x",
        null,
        2
      ],
      [
        "y",
        null,
        -5
      ],
      [
        "x",
        null,
        1
      ],
      [
        "y",
        null,
        5
      ],
      [
        "x",
        null,
        -5
      ],
      [
        "y",
        null,
        -1
      ],
      [
        "x",
        null,
        -5
      ],
      [
        "x",
        null,
        -5
      ],
      [
        "y",
        null,
        -5
      ]
    ],
    "optimal": false,
    "authorSeed": 21045
  },
  {
    "size": 7,
    "cells": [
      {
        "x": 4,
        "y": 5,
        "color": "green",
        "id": 0
      },
      {
        "x": 5,
        "y": 5,
        "color": "green",
        "id": 1
      },
      {
        "x": 3,
        "y": 5,
        "color": "green",
        "id": 2
      },
      {
        "x": 4,
        "y": 4,
        "color": "green",
        "id": 3
      },
      {
        "x": 1,
        "y": 3,
        "color": "green",
        "id": 4
      },
      {
        "x": 5,
        "y": 3,
        "color": "green",
        "id": 5
      },
      {
        "x": 2,
        "y": 2,
        "color": "red",
        "id": 6
      },
      {
        "x": 2,
        "y": 1,
        "color": "red",
        "id": 7
      },
      {
        "x": 3,
        "y": 1,
        "color": "red",
        "id": 8
      },
      {
        "x": 1,
        "y": 1,
        "color": "red",
        "id": 9
      },
      {
        "x": 4,
        "y": 2,
        "color": "red",
        "id": 10
      },
      {
        "x": 0,
        "y": 5,
        "color": "red",
        "id": 11
      },
      {
        "x": 5,
        "y": 1,
        "color": "blue",
        "id": 12
      },
      {
        "x": 4,
        "y": 1,
        "color": "blue",
        "id": 13
      },
      {
        "x": 6,
        "y": 1,
        "color": "blue",
        "id": 14
      },
      {
        "x": 5,
        "y": 2,
        "color": "blue",
        "id": 15
      },
      {
        "x": 6,
        "y": 3,
        "color": "blue",
        "id": 16
      },
      {
        "x": 5,
        "y": 4,
        "color": "blue",
        "id": 17
      }
    ],
    "walls": [
      {
        "x": 3,
        "y": 2
      },
      {
        "x": 2,
        "y": 3
      },
      {
        "x": 3,
        "y": 3
      },
      {
        "x": 4,
        "y": 3
      },
      {
        "x": 3,
        "y": 4
      }
    ],
    "name": "Длинные руки",
    "moves": 24,
    "solution": [
      [
        "x",
        4,
        1
      ],
      [
        "y",
        6,
        -6
      ],
      [
        "y",
        1,
        2
      ],
      [
        "x",
        5,
        5
      ],
      [
        "y",
        5,
        -3
      ],
      [
        "y",
        4,
        -1
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        2
      ],
      [
        "x",
        null,
        1
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "y",
        null,
        5
      ],
      [
        "y",
        null,
        -6
      ]
    ],
    "optimal": false,
    "authorSeed": 22054
  },
  {
    "size": 7,
    "cells": [
      {
        "x": 5,
        "y": 1,
        "color": "green",
        "id": 0
      },
      {
        "x": 5,
        "y": 0,
        "color": "green",
        "id": 1
      },
      {
        "x": 5,
        "y": 2,
        "color": "green",
        "id": 2
      },
      {
        "x": 1,
        "y": 2,
        "color": "green",
        "id": 3
      },
      {
        "x": 2,
        "y": 4,
        "color": "green",
        "id": 4
      },
      {
        "x": 0,
        "y": 0,
        "color": "red",
        "id": 5
      },
      {
        "x": 0,
        "y": 1,
        "color": "red",
        "id": 6
      },
      {
        "x": 0,
        "y": 2,
        "color": "red",
        "id": 7
      },
      {
        "x": 0,
        "y": 5,
        "color": "red",
        "id": 8
      },
      {
        "x": 3,
        "y": 0,
        "color": "red",
        "id": 9
      },
      {
        "x": 1,
        "y": 4,
        "color": "blue",
        "id": 10
      },
      {
        "x": 1,
        "y": 3,
        "color": "blue",
        "id": 11
      },
      {
        "x": 0,
        "y": 4,
        "color": "blue",
        "id": 12
      },
      {
        "x": 4,
        "y": 2,
        "color": "blue",
        "id": 13
      },
      {
        "x": 3,
        "y": 6,
        "color": "blue",
        "id": 14
      }
    ],
    "walls": [
      {
        "x": 1,
        "y": 1
      },
      {
        "x": 2,
        "y": 1
      },
      {
        "x": 3,
        "y": 1
      },
      {
        "x": 4,
        "y": 1
      },
      {
        "x": 2,
        "y": 3
      },
      {
        "x": 3,
        "y": 3
      },
      {
        "x": 4,
        "y": 3
      },
      {
        "x": 5,
        "y": 3
      },
      {
        "x": 1,
        "y": 5
      },
      {
        "x": 2,
        "y": 5
      },
      {
        "x": 3,
        "y": 5
      },
      {
        "x": 4,
        "y": 5
      }
    ],
    "name": "Змейка",
    "moves": 33,
    "solution": [
      [
        "x",
        0,
        -6
      ],
      [
        "x",
        2,
        3
      ],
      [
        "x",
        4,
        4
      ],
      [
        "y",
        6,
        -6
      ],
      [
        "x",
        6,
        -2
      ],
      [
        "y",
        0,
        -6
      ],
      [
        "y",
        5,
        -1
      ],
      [
        "x",
        2,
        1
      ],
      [
        "x",
        6,
        5
      ],
      [
        "y",
        6,
        -5
      ],
      [
        "y",
        5,
        1
      ],
      [
        "x",
        2,
        -6
      ],
      [
        "y",
        0,
        -6
      ]
    ],
    "allFloorSolution": [
      [
        "x",
        null,
        4
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "x",
        null,
        5
      ],
      [
        "x",
        null,
        -4
      ],
      [
        "y",
        null,
        1
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "y",
        null,
        -6
      ]
    ],
    "optimal": false,
    "authorSeed": 23194
  },
  {
    "size": 7,
    "cells": [
      {
        "x": 1,
        "y": 4,
        "color": "green",
        "id": 0
      },
      {
        "x": 2,
        "y": 4,
        "color": "green",
        "id": 1
      },
      {
        "x": 1,
        "y": 3,
        "color": "green",
        "id": 2
      },
      {
        "x": 3,
        "y": 5,
        "color": "green",
        "id": 3
      },
      {
        "x": 6,
        "y": 2,
        "color": "green",
        "id": 4
      },
      {
        "x": 5,
        "y": 3,
        "color": "red",
        "id": 5
      },
      {
        "x": 5,
        "y": 2,
        "color": "red",
        "id": 6
      },
      {
        "x": 5,
        "y": 1,
        "color": "red",
        "id": 7
      },
      {
        "x": 3,
        "y": 1,
        "color": "red",
        "id": 8
      },
      {
        "x": 6,
        "y": 4,
        "color": "red",
        "id": 9
      },
      {
        "x": 2,
        "y": 6,
        "color": "blue",
        "id": 10
      },
      {
        "x": 1,
        "y": 6,
        "color": "blue",
        "id": 11
      },
      {
        "x": 2,
        "y": 5,
        "color": "blue",
        "id": 12
      },
      {
        "x": 0,
        "y": 0,
        "color": "blue",
        "id": 13
      },
      {
        "x": 4,
        "y": 1,
        "color": "blue",
        "id": 14
      },
      {
        "x": 6,
        "y": 1,
        "color": "orange",
        "id": 15
      },
      {
        "x": 6,
        "y": 0,
        "color": "orange",
        "id": 16
      },
      {
        "x": 5,
        "y": 0,
        "color": "orange",
        "id": 17
      },
      {
        "x": 4,
        "y": 6,
        "color": "orange",
        "id": 18
      },
      {
        "x": 2,
        "y": 1,
        "color": "orange",
        "id": 19
      }
    ],
    "walls": [
      {
        "x": 3,
        "y": 0
      },
      {
        "x": 3,
        "y": 2
      },
      {
        "x": 0,
        "y": 3
      },
      {
        "x": 2,
        "y": 3
      },
      {
        "x": 3,
        "y": 3
      },
      {
        "x": 4,
        "y": 3
      },
      {
        "x": 6,
        "y": 3
      },
      {
        "x": 3,
        "y": 4
      },
      {
        "x": 3,
        "y": 6
      }
    ],
    "name": "Четыре комнаты",
    "moves": 31,
    "solution": [
      [
        "y",
        5,
        1
      ],
      [
        "y",
        4,
        -6
      ],
      [
        "x",
        1,
        2
      ],
      [
        "x",
        2,
        -1
      ],
      [
        "y",
        5,
        3
      ],
      [
        "x",
        5,
        -6
      ],
      [
        "x",
        0,
        1
      ],
      [
        "y",
        1,
        4
      ],
      [
        "x",
        4,
        1
      ],
      [
        "y",
        5,
        -6
      ],
      [
        "y",
        5,
        5
      ],
      [
        "x",
        5,
        -6
      ]
    ],
    "allFloorSolution": [
      [
        "x",
        null,
        -1
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "y",
        null,
        1
      ],
      [
        "x",
        null,
        3
      ],
      [
        "x",
        null,
        1
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "x",
        null,
        -1
      ],
      [
        "y",
        null,
        3
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "x",
        null,
        1
      ],
      [
        "y",
        null,
        3
      ]
    ],
    "optimal": false,
    "authorSeed": 24072
  },
  {
    "size": 7,
    "cells": [
      {
        "x": 5,
        "y": 6,
        "color": "green",
        "id": 0
      },
      {
        "x": 4,
        "y": 6,
        "color": "green",
        "id": 1
      },
      {
        "x": 6,
        "y": 6,
        "color": "green",
        "id": 2
      },
      {
        "x": 2,
        "y": 0,
        "color": "green",
        "id": 3
      },
      {
        "x": 0,
        "y": 0,
        "color": "green",
        "id": 4
      },
      {
        "x": 2,
        "y": 6,
        "color": "red",
        "id": 5
      },
      {
        "x": 1,
        "y": 6,
        "color": "red",
        "id": 6
      },
      {
        "x": 3,
        "y": 6,
        "color": "red",
        "id": 7
      },
      {
        "x": 2,
        "y": 3,
        "color": "red",
        "id": 8
      },
      {
        "x": 3,
        "y": 2,
        "color": "red",
        "id": 9
      },
      {
        "x": 0,
        "y": 4,
        "color": "blue",
        "id": 10
      },
      {
        "x": 0,
        "y": 5,
        "color": "blue",
        "id": 11
      },
      {
        "x": 0,
        "y": 3,
        "color": "blue",
        "id": 12
      },
      {
        "x": 2,
        "y": 2,
        "color": "blue",
        "id": 13
      },
      {
        "x": 6,
        "y": 3,
        "color": "blue",
        "id": 14
      }
    ],
    "walls": [
      {
        "x": 1,
        "y": 1
      },
      {
        "x": 2,
        "y": 1
      },
      {
        "x": 4,
        "y": 1
      },
      {
        "x": 5,
        "y": 1
      },
      {
        "x": 1,
        "y": 2
      },
      {
        "x": 5,
        "y": 2
      },
      {
        "x": 1,
        "y": 4
      },
      {
        "x": 5,
        "y": 4
      },
      {
        "x": 1,
        "y": 5
      },
      {
        "x": 2,
        "y": 5
      },
      {
        "x": 4,
        "y": 5
      },
      {
        "x": 5,
        "y": 5
      }
    ],
    "name": "Двойное кольцо",
    "moves": 24,
    "solution": [
      [
        "x",
        3,
        1
      ],
      [
        "x",
        0,
        3
      ],
      [
        "y",
        3,
        2
      ],
      [
        "x",
        3,
        -6
      ],
      [
        "x",
        0,
        -2
      ],
      [
        "y",
        3,
        5
      ],
      [
        "y",
        2,
        1
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        -1
      ],
      [
        "y",
        null,
        1
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "x",
        null,
        1
      ],
      [
        "y",
        null,
        5
      ],
      [
        "x",
        null,
        -6
      ]
    ],
    "optimal": false,
    "authorSeed": 25081
  },
  {
    "size": 7,
    "cells": [
      {
        "x": 2,
        "y": 2,
        "color": "green",
        "id": 0
      },
      {
        "x": 2,
        "y": 3,
        "color": "green",
        "id": 1
      },
      {
        "x": 2,
        "y": 4,
        "color": "green",
        "id": 2
      },
      {
        "x": 1,
        "y": 3,
        "color": "green",
        "id": 3
      },
      {
        "x": 4,
        "y": 3,
        "color": "green",
        "id": 4
      },
      {
        "x": 0,
        "y": 2,
        "color": "green",
        "id": 5
      },
      {
        "x": 3,
        "y": 0,
        "color": "red",
        "id": 6
      },
      {
        "x": 2,
        "y": 0,
        "color": "red",
        "id": 7
      },
      {
        "x": 4,
        "y": 0,
        "color": "red",
        "id": 8
      },
      {
        "x": 5,
        "y": 0,
        "color": "red",
        "id": 9
      },
      {
        "x": 4,
        "y": 4,
        "color": "red",
        "id": 10
      },
      {
        "x": 1,
        "y": 4,
        "color": "red",
        "id": 11
      },
      {
        "x": 4,
        "y": 6,
        "color": "blue",
        "id": 12
      },
      {
        "x": 5,
        "y": 6,
        "color": "blue",
        "id": 13
      },
      {
        "x": 3,
        "y": 6,
        "color": "blue",
        "id": 14
      },
      {
        "x": 6,
        "y": 6,
        "color": "blue",
        "id": 15
      },
      {
        "x": 0,
        "y": 3,
        "color": "blue",
        "id": 16
      },
      {
        "x": 2,
        "y": 5,
        "color": "blue",
        "id": 17
      }
    ],
    "walls": [
      {
        "x": 1,
        "y": 1
      },
      {
        "x": 2,
        "y": 1
      },
      {
        "x": 3,
        "y": 1
      },
      {
        "x": 3,
        "y": 2
      },
      {
        "x": 3,
        "y": 3
      },
      {
        "x": 3,
        "y": 4
      },
      {
        "x": 3,
        "y": 5
      },
      {
        "x": 4,
        "y": 5
      },
      {
        "x": 5,
        "y": 5
      }
    ],
    "name": "Серпантин",
    "moves": 29,
    "solution": [
      [
        "x",
        6,
        -6
      ],
      [
        "y",
        1,
        1
      ],
      [
        "y",
        0,
        2
      ],
      [
        "x",
        4,
        1
      ],
      [
        "y",
        5,
        -6
      ],
      [
        "x",
        5,
        -6
      ],
      [
        "y",
        0,
        -6
      ],
      [
        "x",
        0,
        -6
      ],
      [
        "y",
        4,
        -6
      ],
      [
        "x",
        0,
        -6
      ],
      [
        "y",
        0,
        3
      ]
    ],
    "allFloorSolution": [
      [
        "x",
        null,
        -6
      ],
      [
        "x",
        null,
        2
      ],
      [
        "x",
        null,
        -1
      ],
      [
        "y",
        null,
        2
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "y",
        null,
        3
      ]
    ],
    "optimal": false,
    "authorSeed": 26090
  },
  {
    "size": 7,
    "cells": [
      {
        "x": 2,
        "y": 6,
        "color": "green",
        "id": 0
      },
      {
        "x": 3,
        "y": 6,
        "color": "green",
        "id": 1
      },
      {
        "x": 4,
        "y": 6,
        "color": "green",
        "id": 2
      },
      {
        "x": 4,
        "y": 1,
        "color": "green",
        "id": 3
      },
      {
        "x": 0,
        "y": 5,
        "color": "green",
        "id": 4
      },
      {
        "x": 3,
        "y": 4,
        "color": "red",
        "id": 5
      },
      {
        "x": 3,
        "y": 5,
        "color": "red",
        "id": 6
      },
      {
        "x": 4,
        "y": 5,
        "color": "red",
        "id": 7
      },
      {
        "x": 3,
        "y": 0,
        "color": "red",
        "id": 8
      },
      {
        "x": 5,
        "y": 6,
        "color": "red",
        "id": 9
      },
      {
        "x": 4,
        "y": 3,
        "color": "blue",
        "id": 10
      },
      {
        "x": 5,
        "y": 3,
        "color": "blue",
        "id": 11
      },
      {
        "x": 6,
        "y": 3,
        "color": "blue",
        "id": 12
      },
      {
        "x": 6,
        "y": 0,
        "color": "blue",
        "id": 13
      },
      {
        "x": 4,
        "y": 0,
        "color": "blue",
        "id": 14
      },
      {
        "x": 3,
        "y": 2,
        "color": "orange",
        "id": 15
      },
      {
        "x": 3,
        "y": 1,
        "color": "orange",
        "id": 16
      },
      {
        "x": 2,
        "y": 1,
        "color": "orange",
        "id": 17
      },
      {
        "x": 1,
        "y": 0,
        "color": "orange",
        "id": 18
      },
      {
        "x": 5,
        "y": 0,
        "color": "orange",
        "id": 19
      }
    ],
    "walls": [
      {
        "x": 1,
        "y": 1
      },
      {
        "x": 5,
        "y": 1
      },
      {
        "x": 2,
        "y": 2
      },
      {
        "x": 4,
        "y": 2
      },
      {
        "x": 3,
        "y": 3
      },
      {
        "x": 2,
        "y": 4
      },
      {
        "x": 4,
        "y": 4
      },
      {
        "x": 1,
        "y": 5
      },
      {
        "x": 5,
        "y": 5
      }
    ],
    "name": "Крылья",
    "moves": 52,
    "solution": [
      [
        "x",
        6,
        -1
      ],
      [
        "y",
        6,
        2
      ],
      [
        "x",
        0,
        -1
      ],
      [
        "y",
        0,
        2
      ],
      [
        "x",
        0,
        -6
      ],
      [
        "x",
        2,
        1
      ],
      [
        "y",
        0,
        4
      ],
      [
        "x",
        0,
        -6
      ],
      [
        "y",
        0,
        4
      ],
      [
        "x",
        2,
        -6
      ],
      [
        "y",
        0,
        -1
      ],
      [
        "x",
        4,
        1
      ],
      [
        "y",
        0,
        -1
      ],
      [
        "x",
        0,
        1
      ],
      [
        "y",
        0,
        -6
      ],
      [
        "x",
        0,
        6
      ],
      [
        "y",
        6,
        1
      ],
      [
        "y",
        4,
        -6
      ],
      [
        "x",
        0,
        -6
      ],
      [
        "y",
        0,
        5
      ],
      [
        "x",
        4,
        -6
      ],
      [
        "y",
        0,
        2
      ],
      [
        "x",
        6,
        3
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        2
      ],
      [
        "x",
        null,
        -1
      ],
      [
        "y",
        null,
        5
      ],
      [
        "x",
        null,
        2
      ],
      [
        "y",
        null,
        -4
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "y",
        null,
        1
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "x",
        null,
        2
      ],
      [
        "y",
        null,
        1
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "x",
        null,
        2
      ],
      [
        "y",
        null,
        6
      ],
      [
        "x",
        null,
        -6
      ],
      [
        "y",
        null,
        5
      ]
    ],
    "optimal": false,
    "authorSeed": 27492
  },
  {
    "size": 7,
    "cells": [
      {
        "x": 5,
        "y": 0,
        "color": "green",
        "id": 0
      },
      {
        "x": 5,
        "y": 1,
        "color": "green",
        "id": 1
      },
      {
        "x": 4,
        "y": 1,
        "color": "green",
        "id": 2
      },
      {
        "x": 4,
        "y": 0,
        "color": "green",
        "id": 3
      },
      {
        "x": 6,
        "y": 3,
        "color": "green",
        "id": 4
      },
      {
        "x": 0,
        "y": 3,
        "color": "green",
        "id": 5
      },
      {
        "x": 4,
        "y": 6,
        "color": "red",
        "id": 6
      },
      {
        "x": 5,
        "y": 6,
        "color": "red",
        "id": 7
      },
      {
        "x": 5,
        "y": 5,
        "color": "red",
        "id": 8
      },
      {
        "x": 4,
        "y": 5,
        "color": "red",
        "id": 9
      },
      {
        "x": 3,
        "y": 0,
        "color": "red",
        "id": 10
      },
      {
        "x": 6,
        "y": 2,
        "color": "red",
        "id": 11
      },
      {
        "x": 2,
        "y": 1,
        "color": "blue",
        "id": 12
      },
      {
        "x": 1,
        "y": 1,
        "color": "blue",
        "id": 13
      },
      {
        "x": 1,
        "y": 2,
        "color": "blue",
        "id": 14
      },
      {
        "x": 3,
        "y": 1,
        "color": "blue",
        "id": 15
      },
      {
        "x": 0,
        "y": 5,
        "color": "blue",
        "id": 16
      },
      {
        "x": 6,
        "y": 4,
        "color": "blue",
        "id": 17
      }
    ],
    "walls": [
      {
        "x": 2,
        "y": 2
      },
      {
        "x": 3,
        "y": 2
      },
      {
        "x": 4,
        "y": 2
      },
      {
        "x": 2,
        "y": 3
      },
      {
        "x": 4,
        "y": 3
      },
      {
        "x": 2,
        "y": 4
      },
      {
        "x": 4,
        "y": 4
      }
    ],
    "name": "Колодец",
    "moves": 27,
    "solution": [
      [
        "y",
        0,
        -6
      ],
      [
        "x",
        0,
        3
      ],
      [
        "x",
        2,
        -6
      ],
      [
        "y",
        5,
        2
      ],
      [
        "x",
        0,
        2
      ],
      [
        "y",
        6,
        4
      ],
      [
        "y",
        6,
        -5
      ],
      [
        "x",
        1,
        -6
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        -1
      ],
      [
        "x",
        null,
        -1
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "y",
        null,
        5
      ],
      [
        "x",
        null,
        1
      ],
      [
        "y",
        null,
        1
      ],
      [
        "x",
        null,
        4
      ],
      [
        "y",
        null,
        4
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "x",
        null,
        -6
      ]
    ],
    "optimal": false,
    "authorSeed": 28108
  },
  {
    "size": 7,
    "cells": [
      {
        "x": 4,
        "y": 3,
        "color": "green",
        "id": 0
      },
      {
        "x": 3,
        "y": 3,
        "color": "green",
        "id": 1
      },
      {
        "x": 2,
        "y": 3,
        "color": "green",
        "id": 2
      },
      {
        "x": 0,
        "y": 3,
        "color": "green",
        "id": 3
      },
      {
        "x": 2,
        "y": 6,
        "color": "green",
        "id": 4
      },
      {
        "x": 0,
        "y": 5,
        "color": "red",
        "id": 5
      },
      {
        "x": 1,
        "y": 5,
        "color": "red",
        "id": 6
      },
      {
        "x": 1,
        "y": 4,
        "color": "red",
        "id": 7
      },
      {
        "x": 3,
        "y": 5,
        "color": "red",
        "id": 8
      },
      {
        "x": 2,
        "y": 1,
        "color": "red",
        "id": 9
      },
      {
        "x": 3,
        "y": 6,
        "color": "blue",
        "id": 10
      },
      {
        "x": 4,
        "y": 6,
        "color": "blue",
        "id": 11
      },
      {
        "x": 5,
        "y": 6,
        "color": "blue",
        "id": 12
      },
      {
        "x": 6,
        "y": 5,
        "color": "blue",
        "id": 13
      },
      {
        "x": 5,
        "y": 0,
        "color": "blue",
        "id": 14
      },
      {
        "x": 6,
        "y": 4,
        "color": "orange",
        "id": 15
      },
      {
        "x": 6,
        "y": 3,
        "color": "orange",
        "id": 16
      },
      {
        "x": 5,
        "y": 4,
        "color": "orange",
        "id": 17
      },
      {
        "x": 1,
        "y": 1,
        "color": "orange",
        "id": 18
      },
      {
        "x": 2,
        "y": 0,
        "color": "orange",
        "id": 19
      }
    ],
    "walls": [
      {
        "x": 0,
        "y": 0
      },
      {
        "x": 6,
        "y": 0
      },
      {
        "x": 2,
        "y": 2
      },
      {
        "x": 4,
        "y": 2
      },
      {
        "x": 2,
        "y": 4
      },
      {
        "x": 4,
        "y": 4
      },
      {
        "x": 0,
        "y": 6
      },
      {
        "x": 6,
        "y": 6
      }
    ],
    "name": "Соты",
    "moves": 26,
    "solution": [
      [
        "y",
        1,
        -6
      ],
      [
        "x",
        5,
        -3
      ],
      [
        "y",
        0,
        -6
      ],
      [
        "x",
        6,
        -6
      ],
      [
        "y",
        1,
        -6
      ],
      [
        "y",
        1,
        2
      ],
      [
        "x",
        1,
        4
      ],
      [
        "y",
        5,
        2
      ],
      [
        "y",
        5,
        4
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        -6
      ],
      [
        "x",
        null,
        -2
      ],
      [
        "y",
        null,
        -6
      ],
      [
        "y",
        null,
        2
      ],
      [
        "x",
        null,
        4
      ],
      [
        "y",
        null,
        3
      ],
      [
        "y",
        null,
        1
      ]
    ],
    "optimal": false,
    "authorSeed": 29117
  },
  {
    "size": 8,
    "cells": [
      {
        "x": 2,
        "y": 7,
        "color": "green",
        "id": 0
      },
      {
        "x": 1,
        "y": 7,
        "color": "green",
        "id": 1
      },
      {
        "x": 2,
        "y": 6,
        "color": "green",
        "id": 2
      },
      {
        "x": 0,
        "y": 6,
        "color": "green",
        "id": 3
      },
      {
        "x": 0,
        "y": 2,
        "color": "green",
        "id": 4
      },
      {
        "x": 0,
        "y": 1,
        "color": "red",
        "id": 5
      },
      {
        "x": 1,
        "y": 1,
        "color": "red",
        "id": 6
      },
      {
        "x": 2,
        "y": 1,
        "color": "red",
        "id": 7
      },
      {
        "x": 6,
        "y": 0,
        "color": "red",
        "id": 8
      },
      {
        "x": 2,
        "y": 3,
        "color": "red",
        "id": 9
      },
      {
        "x": 7,
        "y": 5,
        "color": "blue",
        "id": 10
      },
      {
        "x": 6,
        "y": 5,
        "color": "blue",
        "id": 11
      },
      {
        "x": 6,
        "y": 6,
        "color": "blue",
        "id": 12
      },
      {
        "x": 2,
        "y": 2,
        "color": "blue",
        "id": 13
      },
      {
        "x": 2,
        "y": 4,
        "color": "blue",
        "id": 14
      },
      {
        "x": 2,
        "y": 0,
        "color": "orange",
        "id": 15
      },
      {
        "x": 1,
        "y": 0,
        "color": "orange",
        "id": 16
      },
      {
        "x": 0,
        "y": 0,
        "color": "orange",
        "id": 17
      },
      {
        "x": 0,
        "y": 5,
        "color": "orange",
        "id": 18
      },
      {
        "x": 7,
        "y": 6,
        "color": "orange",
        "id": 19
      }
    ],
    "walls": [
      {
        "x": 3,
        "y": 0
      },
      {
        "x": 4,
        "y": 0
      },
      {
        "x": 3,
        "y": 1
      },
      {
        "x": 4,
        "y": 1
      },
      {
        "x": 0,
        "y": 3
      },
      {
        "x": 1,
        "y": 3
      },
      {
        "x": 3,
        "y": 3
      },
      {
        "x": 4,
        "y": 3
      },
      {
        "x": 6,
        "y": 3
      },
      {
        "x": 7,
        "y": 3
      },
      {
        "x": 0,
        "y": 4
      },
      {
        "x": 1,
        "y": 4
      },
      {
        "x": 3,
        "y": 4
      },
      {
        "x": 4,
        "y": 4
      },
      {
        "x": 6,
        "y": 4
      },
      {
        "x": 7,
        "y": 4
      },
      {
        "x": 3,
        "y": 6
      },
      {
        "x": 4,
        "y": 6
      },
      {
        "x": 3,
        "y": 7
      },
      {
        "x": 4,
        "y": 7
      }
    ],
    "name": "Крестовые проходы",
    "moves": 31,
    "solution": [
      [
        "y",
        6,
        2
      ],
      [
        "x",
        2,
        -7
      ],
      [
        "x",
        6,
        -7
      ],
      [
        "y",
        2,
        1
      ],
      [
        "x",
        5,
        3
      ],
      [
        "x",
        2,
        2
      ],
      [
        "y",
        2,
        4
      ],
      [
        "x",
        2,
        2
      ],
      [
        "y",
        5,
        2
      ],
      [
        "x",
        5,
        3
      ],
      [
        "x",
        5,
        -7
      ],
      [
        "y",
        5,
        -4
      ]
    ],
    "allFloorSolution": [
      [
        "x",
        null,
        3
      ],
      [
        "y",
        null,
        4
      ],
      [
        "x",
        null,
        2
      ],
      [
        "y",
        null,
        -7
      ],
      [
        "y",
        null,
        5
      ],
      [
        "x",
        null,
        -7
      ],
      [
        "y",
        null,
        -7
      ],
      [
        "y",
        null,
        2
      ],
      [
        "x",
        null,
        2
      ]
    ],
    "optimal": false,
    "authorSeed": 30126
  },
  {
    "size": 8,
    "cells": [
      {
        "x": 4,
        "y": 2,
        "color": "green",
        "id": 0
      },
      {
        "x": 4,
        "y": 1,
        "color": "green",
        "id": 1
      },
      {
        "x": 4,
        "y": 0,
        "color": "green",
        "id": 2
      },
      {
        "x": 3,
        "y": 0,
        "color": "green",
        "id": 3
      },
      {
        "x": 7,
        "y": 6,
        "color": "green",
        "id": 4
      },
      {
        "x": 0,
        "y": 5,
        "color": "green",
        "id": 5
      },
      {
        "x": 0,
        "y": 6,
        "color": "red",
        "id": 6
      },
      {
        "x": 1,
        "y": 6,
        "color": "red",
        "id": 7
      },
      {
        "x": 2,
        "y": 6,
        "color": "red",
        "id": 8
      },
      {
        "x": 3,
        "y": 6,
        "color": "red",
        "id": 9
      },
      {
        "x": 5,
        "y": 3,
        "color": "red",
        "id": 10
      },
      {
        "x": 2,
        "y": 2,
        "color": "red",
        "id": 11
      },
      {
        "x": 2,
        "y": 1,
        "color": "blue",
        "id": 12
      },
      {
        "x": 2,
        "y": 0,
        "color": "blue",
        "id": 13
      },
      {
        "x": 1,
        "y": 0,
        "color": "blue",
        "id": 14
      },
      {
        "x": 0,
        "y": 0,
        "color": "blue",
        "id": 15
      },
      {
        "x": 0,
        "y": 2,
        "color": "blue",
        "id": 16
      },
      {
        "x": 1,
        "y": 5,
        "color": "blue",
        "id": 17
      }
    ],
    "walls": [
      {
        "x": 1,
        "y": 1
      },
      {
        "x": 3,
        "y": 1
      },
      {
        "x": 5,
        "y": 1
      },
      {
        "x": 1,
        "y": 2
      },
      {
        "x": 3,
        "y": 2
      },
      {
        "x": 5,
        "y": 2
      },
      {
        "x": 2,
        "y": 4
      },
      {
        "x": 4,
        "y": 4
      },
      {
        "x": 6,
        "y": 4
      },
      {
        "x": 2,
        "y": 5
      },
      {
        "x": 4,
        "y": 5
      },
      {
        "x": 6,
        "y": 5
      }
    ],
    "name": "Рояль",
    "moves": 26,
    "solution": [
      [
        "y",
        7,
        -3
      ],
      [
        "x",
        3,
        -7
      ],
      [
        "y",
        0,
        -7
      ],
      [
        "x",
        3,
        3
      ],
      [
        "y",
        2,
        1
      ],
      [
        "x",
        3,
        -7
      ],
      [
        "y",
        0,
        3
      ],
      [
        "x",
        5,
        -7
      ],
      [
        "y",
        0,
        -7
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        -7
      ],
      [
        "y",
        null,
        1
      ],
      [
        "x",
        null,
        3
      ],
      [
        "y",
        null,
        2
      ],
      [
        "x",
        null,
        -3
      ],
      [
        "y",
        null,
        -7
      ]
    ],
    "optimal": false,
    "authorSeed": 31135
  },
  {
    "size": 8,
    "cells": [
      {
        "x": 5,
        "y": 5,
        "color": "green",
        "id": 0
      },
      {
        "x": 4,
        "y": 5,
        "color": "green",
        "id": 1
      },
      {
        "x": 5,
        "y": 4,
        "color": "green",
        "id": 2
      },
      {
        "x": 3,
        "y": 5,
        "color": "green",
        "id": 3
      },
      {
        "x": 4,
        "y": 1,
        "color": "green",
        "id": 4
      },
      {
        "x": 1,
        "y": 0,
        "color": "green",
        "id": 5
      },
      {
        "x": 6,
        "y": 4,
        "color": "red",
        "id": 6
      },
      {
        "x": 6,
        "y": 3,
        "color": "red",
        "id": 7
      },
      {
        "x": 7,
        "y": 3,
        "color": "red",
        "id": 8
      },
      {
        "x": 7,
        "y": 2,
        "color": "red",
        "id": 9
      },
      {
        "x": 3,
        "y": 2,
        "color": "red",
        "id": 10
      },
      {
        "x": 5,
        "y": 2,
        "color": "red",
        "id": 11
      },
      {
        "x": 1,
        "y": 7,
        "color": "blue",
        "id": 12
      },
      {
        "x": 1,
        "y": 6,
        "color": "blue",
        "id": 13
      },
      {
        "x": 0,
        "y": 7,
        "color": "blue",
        "id": 14
      },
      {
        "x": 2,
        "y": 7,
        "color": "blue",
        "id": 15
      },
      {
        "x": 0,
        "y": 5,
        "color": "blue",
        "id": 16
      },
      {
        "x": 5,
        "y": 7,
        "color": "blue",
        "id": 17
      },
      {
        "x": 3,
        "y": 0,
        "color": "orange",
        "id": 18
      },
      {
        "x": 2,
        "y": 0,
        "color": "orange",
        "id": 19
      },
      {
        "x": 3,
        "y": 1,
        "color": "orange",
        "id": 20
      },
      {
        "x": 4,
        "y": 0,
        "color": "orange",
        "id": 21
      },
      {
        "x": 0,
        "y": 3,
        "color": "orange",
        "id": 22
      },
      {
        "x": 7,
        "y": 1,
        "color": "orange",
        "id": 23
      }
    ],
    "walls": [
      {
        "x": 2,
        "y": 1
      },
      {
        "x": 5,
        "y": 1
      },
      {
        "x": 1,
        "y": 2
      },
      {
        "x": 6,
        "y": 2
      },
      {
        "x": 3,
        "y": 3
      },
      {
        "x": 4,
        "y": 3
      },
      {
        "x": 3,
        "y": 4
      },
      {
        "x": 4,
        "y": 4
      },
      {
        "x": 1,
        "y": 5
      },
      {
        "x": 6,
        "y": 5
      },
      {
        "x": 2,
        "y": 6
      },
      {
        "x": 5,
        "y": 6
      }
    ],
    "name": "Галактика",
    "moves": 31,
    "solution": [
      [
        "y",
        5,
        1
      ],
      [
        "x",
        2,
        2
      ],
      [
        "x",
        7,
        -7
      ],
      [
        "y",
        7,
        -7
      ],
      [
        "x",
        0,
        -7
      ],
      [
        "y",
        0,
        3
      ],
      [
        "x",
        3,
        2
      ],
      [
        "y",
        4,
        1
      ],
      [
        "x",
        2,
        -7
      ],
      [
        "y",
        2,
        2
      ],
      [
        "y",
        0,
        -7
      ],
      [
        "x",
        0,
        2
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        1
      ],
      [
        "y",
        null,
        -1
      ],
      [
        "x",
        null,
        2
      ],
      [
        "x",
        null,
        -7
      ],
      [
        "y",
        null,
        4
      ],
      [
        "x",
        null,
        7
      ],
      [
        "y",
        null,
        1
      ],
      [
        "y",
        null,
        -7
      ]
    ],
    "optimal": false,
    "authorSeed": 32144
  },
  {
    "size": 8,
    "cells": [
      {
        "x": 4,
        "y": 0,
        "color": "green",
        "id": 0
      },
      {
        "x": 5,
        "y": 0,
        "color": "green",
        "id": 1
      },
      {
        "x": 5,
        "y": 1,
        "color": "green",
        "id": 2
      },
      {
        "x": 6,
        "y": 1,
        "color": "green",
        "id": 3
      },
      {
        "x": 3,
        "y": 6,
        "color": "green",
        "id": 4
      },
      {
        "x": 0,
        "y": 4,
        "color": "green",
        "id": 5
      },
      {
        "x": 2,
        "y": 4,
        "color": "red",
        "id": 6
      },
      {
        "x": 3,
        "y": 4,
        "color": "red",
        "id": 7
      },
      {
        "x": 3,
        "y": 5,
        "color": "red",
        "id": 8
      },
      {
        "x": 2,
        "y": 3,
        "color": "red",
        "id": 9
      },
      {
        "x": 0,
        "y": 1,
        "color": "red",
        "id": 10
      },
      {
        "x": 7,
        "y": 2,
        "color": "red",
        "id": 11
      },
      {
        "x": 1,
        "y": 4,
        "color": "blue",
        "id": 12
      },
      {
        "x": 1,
        "y": 3,
        "color": "blue",
        "id": 13
      },
      {
        "x": 0,
        "y": 3,
        "color": "blue",
        "id": 14
      },
      {
        "x": 0,
        "y": 2,
        "color": "blue",
        "id": 15
      },
      {
        "x": 4,
        "y": 1,
        "color": "blue",
        "id": 16
      },
      {
        "x": 3,
        "y": 2,
        "color": "blue",
        "id": 17
      },
      {
        "x": 5,
        "y": 3,
        "color": "orange",
        "id": 18
      },
      {
        "x": 4,
        "y": 3,
        "color": "orange",
        "id": 19
      },
      {
        "x": 4,
        "y": 2,
        "color": "orange",
        "id": 20
      },
      {
        "x": 3,
        "y": 3,
        "color": "orange",
        "id": 21
      },
      {
        "x": 4,
        "y": 6,
        "color": "orange",
        "id": 22
      },
      {
        "x": 1,
        "y": 6,
        "color": "orange",
        "id": 23
      }
    ],
    "walls": [
      {
        "x": 1,
        "y": 2
      },
      {
        "x": 2,
        "y": 2
      },
      {
        "x": 5,
        "y": 2
      },
      {
        "x": 6,
        "y": 2
      },
      {
        "x": 1,
        "y": 5
      },
      {
        "x": 2,
        "y": 5
      },
      {
        "x": 5,
        "y": 5
      },
      {
        "x": 6,
        "y": 5
      }
    ],
    "name": "Сломанный мост",
    "moves": 29,
    "solution": [
      [
        "y",
        3,
        -1
      ],
      [
        "y",
        0,
        -7
      ],
      [
        "x",
        1,
        -7
      ],
      [
        "y",
        7,
        2
      ],
      [
        "x",
        4,
        -7
      ],
      [
        "y",
        0,
        3
      ],
      [
        "x",
        3,
        1
      ],
      [
        "y",
        1,
        1
      ],
      [
        "x",
        7,
        3
      ],
      [
        "y",
        4,
        -7
      ],
      [
        "y",
        3,
        -7
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        -1
      ],
      [
        "x",
        null,
        3
      ],
      [
        "x",
        null,
        -7
      ],
      [
        "y",
        null,
        -7
      ],
      [
        "x",
        null,
        5
      ],
      [
        "y",
        null,
        -7
      ],
      [
        "x",
        null,
        -7
      ]
    ],
    "optimal": false,
    "authorSeed": 33153
  },
  {
    "size": 8,
    "cells": [
      {
        "x": 7,
        "y": 3,
        "color": "green",
        "id": 0
      },
      {
        "x": 7,
        "y": 4,
        "color": "green",
        "id": 1
      },
      {
        "x": 6,
        "y": 4,
        "color": "green",
        "id": 2
      },
      {
        "x": 6,
        "y": 3,
        "color": "green",
        "id": 3
      },
      {
        "x": 2,
        "y": 1,
        "color": "green",
        "id": 4
      },
      {
        "x": 4,
        "y": 7,
        "color": "green",
        "id": 5
      },
      {
        "x": 3,
        "y": 3,
        "color": "red",
        "id": 6
      },
      {
        "x": 2,
        "y": 3,
        "color": "red",
        "id": 7
      },
      {
        "x": 1,
        "y": 3,
        "color": "red",
        "id": 8
      },
      {
        "x": 3,
        "y": 2,
        "color": "red",
        "id": 9
      },
      {
        "x": 6,
        "y": 7,
        "color": "red",
        "id": 10
      },
      {
        "x": 4,
        "y": 1,
        "color": "red",
        "id": 11
      },
      {
        "x": 5,
        "y": 0,
        "color": "blue",
        "id": 12
      },
      {
        "x": 5,
        "y": 1,
        "color": "blue",
        "id": 13
      },
      {
        "x": 4,
        "y": 0,
        "color": "blue",
        "id": 14
      },
      {
        "x": 3,
        "y": 0,
        "color": "blue",
        "id": 15
      },
      {
        "x": 5,
        "y": 6,
        "color": "blue",
        "id": 16
      },
      {
        "x": 5,
        "y": 4,
        "color": "blue",
        "id": 17
      },
      {
        "x": 3,
        "y": 5,
        "color": "orange",
        "id": 18
      },
      {
        "x": 3,
        "y": 6,
        "color": "orange",
        "id": 19
      },
      {
        "x": 2,
        "y": 6,
        "color": "orange",
        "id": 20
      },
      {
        "x": 3,
        "y": 7,
        "color": "orange",
        "id": 21
      },
      {
        "x": 1,
        "y": 7,
        "color": "orange",
        "id": 22
      },
      {
        "x": 5,
        "y": 7,
        "color": "orange",
        "id": 23
      }
    ],
    "walls": [
      {
        "x": 0,
        "y": 0
      },
      {
        "x": 7,
        "y": 0
      },
      {
        "x": 0,
        "y": 1
      },
      {
        "x": 1,
        "y": 1
      },
      {
        "x": 6,
        "y": 1
      },
      {
        "x": 7,
        "y": 1
      },
      {
        "x": 0,
        "y": 2
      },
      {
        "x": 1,
        "y": 2
      },
      {
        "x": 2,
        "y": 2
      },
      {
        "x": 5,
        "y": 2
      },
      {
        "x": 6,
        "y": 2
      },
      {
        "x": 7,
        "y": 2
      },
      {
        "x": 0,
        "y": 5
      },
      {
        "x": 1,
        "y": 5
      },
      {
        "x": 2,
        "y": 5
      },
      {
        "x": 5,
        "y": 5
      },
      {
        "x": 6,
        "y": 5
      },
      {
        "x": 7,
        "y": 5
      },
      {
        "x": 0,
        "y": 6
      },
      {
        "x": 1,
        "y": 6
      },
      {
        "x": 6,
        "y": 6
      },
      {
        "x": 7,
        "y": 6
      },
      {
        "x": 0,
        "y": 7
      },
      {
        "x": 7,
        "y": 7
      }
    ],
    "name": "Бабочка",
    "moves": 26,
    "solution": [
      [
        "y",
        4,
        -7
      ],
      [
        "x",
        7,
        2
      ],
      [
        "x",
        7,
        -3
      ],
      [
        "y",
        3,
        -7
      ],
      [
        "x",
        1,
        -7
      ],
      [
        "x",
        4,
        -2
      ],
      [
        "x",
        6,
        -2
      ],
      [
        "y",
        3,
        -7
      ],
      [
        "x",
        1,
        2
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        3
      ],
      [
        "x",
        null,
        -7
      ],
      [
        "y",
        null,
        -7
      ],
      [
        "x",
        null,
        2
      ],
      [
        "x",
        null,
        -3
      ],
      [
        "y",
        null,
        -7
      ],
      [
        "y",
        null,
        2
      ]
    ],
    "optimal": false,
    "authorSeed": 34162
  },
  {
    "size": 8,
    "cells": [
      {
        "x": 1,
        "y": 7,
        "color": "green",
        "id": 0
      },
      {
        "x": 0,
        "y": 7,
        "color": "green",
        "id": 1
      },
      {
        "x": 2,
        "y": 7,
        "color": "green",
        "id": 2
      },
      {
        "x": 3,
        "y": 7,
        "color": "green",
        "id": 3
      },
      {
        "x": 3,
        "y": 4,
        "color": "green",
        "id": 4
      },
      {
        "x": 0,
        "y": 2,
        "color": "green",
        "id": 5
      },
      {
        "x": 7,
        "y": 2,
        "color": "red",
        "id": 6
      },
      {
        "x": 7,
        "y": 3,
        "color": "red",
        "id": 7
      },
      {
        "x": 6,
        "y": 3,
        "color": "red",
        "id": 8
      },
      {
        "x": 7,
        "y": 1,
        "color": "red",
        "id": 9
      },
      {
        "x": 0,
        "y": 6,
        "color": "red",
        "id": 10
      },
      {
        "x": 3,
        "y": 1,
        "color": "red",
        "id": 11
      },
      {
        "x": 7,
        "y": 5,
        "color": "blue",
        "id": 12
      },
      {
        "x": 7,
        "y": 4,
        "color": "blue",
        "id": 13
      },
      {
        "x": 6,
        "y": 4,
        "color": "blue",
        "id": 14
      },
      {
        "x": 7,
        "y": 6,
        "color": "blue",
        "id": 15
      },
      {
        "x": 0,
        "y": 1,
        "color": "blue",
        "id": 16
      },
      {
        "x": 4,
        "y": 7,
        "color": "blue",
        "id": 17
      },
      {
        "x": 4,
        "y": 6,
        "color": "orange",
        "id": 18
      },
      {
        "x": 3,
        "y": 6,
        "color": "orange",
        "id": 19
      },
      {
        "x": 4,
        "y": 5,
        "color": "orange",
        "id": 20
      },
      {
        "x": 3,
        "y": 5,
        "color": "orange",
        "id": 21
      },
      {
        "x": 3,
        "y": 0,
        "color": "orange",
        "id": 22
      },
      {
        "x": 4,
        "y": 2,
        "color": "orange",
        "id": 23
      }
    ],
    "walls": [
      {
        "x": 1,
        "y": 1
      },
      {
        "x": 2,
        "y": 1
      },
      {
        "x": 5,
        "y": 1
      },
      {
        "x": 6,
        "y": 1
      },
      {
        "x": 1,
        "y": 2
      },
      {
        "x": 2,
        "y": 2
      },
      {
        "x": 5,
        "y": 2
      },
      {
        "x": 6,
        "y": 2
      },
      {
        "x": 1,
        "y": 5
      },
      {
        "x": 2,
        "y": 5
      },
      {
        "x": 5,
        "y": 5
      },
      {
        "x": 6,
        "y": 5
      },
      {
        "x": 1,
        "y": 6
      },
      {
        "x": 2,
        "y": 6
      },
      {
        "x": 5,
        "y": 6
      },
      {
        "x": 6,
        "y": 6
      }
    ],
    "name": "Желейный мегаполис",
    "moves": 24,
    "solution": [
      [
        "y",
        3,
        2
      ],
      [
        "x",
        4,
        -7
      ],
      [
        "y",
        0,
        -7
      ],
      [
        "x",
        3,
        4
      ],
      [
        "y",
        0,
        4
      ],
      [
        "y",
        4,
        -7
      ],
      [
        "x",
        4,
        4
      ],
      [
        "x",
        4,
        1
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        2
      ],
      [
        "x",
        null,
        3
      ],
      [
        "y",
        null,
        1
      ],
      [
        "y",
        null,
        -3
      ],
      [
        "x",
        null,
        5
      ],
      [
        "y",
        null,
        3
      ]
    ],
    "optimal": false,
    "authorSeed": 35171
  },
  {
    "name": "Желейка внутри",
    "size": 4,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "green",
        "inside": {
          "id": 5,
          "color": "red"
        }
      },
      {
        "id": 2,
        "x": 3,
        "y": 2,
        "color": "green"
      },
      {
        "id": 3,
        "x": 0,
        "y": 3,
        "color": "red"
      },
      {
        "id": 4,
        "x": 1,
        "y": 3,
        "color": "red"
      }
    ],
    "walls": [],
    "moves": 18,
    "solution": [
      [
        "y",
        0,
        2
      ],
      [
        "x",
        2,
        -3
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        -3
      ],
      [
        "x",
        null,
        -3
      ]
    ],
    "optimal": false,
    "theme": "nested"
  },
  {
    "name": "Две начинки",
    "size": 5,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "red",
        "inside": {
          "id": 6,
          "color": "blue"
        }
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "red"
      },
      {
        "id": 2,
        "x": 4,
        "y": 2,
        "color": "red",
        "inside": {
          "id": 7,
          "color": "blue"
        }
      },
      {
        "id": 3,
        "x": 0,
        "y": 4,
        "color": "blue"
      },
      {
        "id": 4,
        "x": 1,
        "y": 4,
        "color": "blue"
      },
      {
        "id": 5,
        "x": 3,
        "y": 4,
        "color": "blue"
      }
    ],
    "walls": [],
    "moves": 18,
    "solution": [
      [
        "x",
        0,
        3
      ],
      [
        "y",
        4,
        3
      ],
      [
        "x",
        3,
        -4
      ]
    ],
    "allFloorSolution": [
      [
        "x",
        null,
        -4
      ],
      [
        "y",
        null,
        -4
      ]
    ],
    "optimal": false,
    "theme": "nested"
  },
  {
    "name": "Разные сердцевины",
    "size": 6,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "green",
        "inside": {
          "id": 7,
          "color": "red"
        }
      },
      {
        "id": 2,
        "x": 5,
        "y": 2,
        "color": "green",
        "inside": {
          "id": 8,
          "color": "blue"
        }
      },
      {
        "id": 3,
        "x": 0,
        "y": 4,
        "color": "red"
      },
      {
        "id": 4,
        "x": 1,
        "y": 4,
        "color": "red"
      },
      {
        "id": 5,
        "x": 4,
        "y": 4,
        "color": "blue"
      },
      {
        "id": 6,
        "x": 5,
        "y": 4,
        "color": "blue"
      }
    ],
    "walls": [],
    "moves": 18,
    "solution": [
      [
        "x",
        0,
        4
      ],
      [
        "y",
        5,
        3
      ],
      [
        "x",
        3,
        -5
      ]
    ],
    "allFloorSolution": [
      [
        "x",
        null,
        -3
      ],
      [
        "y",
        null,
        -5
      ]
    ],
    "optimal": false,
    "theme": "nested"
  },
  {
    "name": "Две оболочки",
    "size": 6,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "green",
        "inside": {
          "id": 7,
          "color": "red"
        }
      },
      {
        "id": 2,
        "x": 5,
        "y": 2,
        "color": "green"
      },
      {
        "id": 3,
        "x": 0,
        "y": 4,
        "color": "red"
      },
      {
        "id": 4,
        "x": 1,
        "y": 4,
        "color": "red",
        "inside": {
          "id": 8,
          "color": "blue"
        }
      },
      {
        "id": 5,
        "x": 0,
        "y": 5,
        "color": "blue"
      },
      {
        "id": 6,
        "x": 5,
        "y": 5,
        "color": "blue"
      }
    ],
    "walls": [
      {
        "x": 2,
        "y": 2
      }
    ],
    "moves": 18,
    "solution": [
      [
        "x",
        0,
        4
      ],
      [
        "y",
        5,
        3
      ],
      [
        "x",
        4,
        4
      ],
      [
        "x",
        4,
        -5
      ]
    ],
    "allFloorSolution": [
      [
        "x",
        null,
        3
      ],
      [
        "y",
        null,
        -5
      ],
      [
        "x",
        null,
        -2
      ]
    ],
    "optimal": false,
    "theme": "nested"
  },
  {
    "name": "Матрешка",
    "size": 6,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green"
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "green",
        "inside": {
          "id": 7,
          "color": "red",
          "inside": {
            "id": 8,
            "color": "blue"
          }
        }
      },
      {
        "id": 2,
        "x": 5,
        "y": 2,
        "color": "green"
      },
      {
        "id": 3,
        "x": 0,
        "y": 4,
        "color": "red"
      },
      {
        "id": 4,
        "x": 1,
        "y": 4,
        "color": "red"
      },
      {
        "id": 5,
        "x": 0,
        "y": 5,
        "color": "blue"
      },
      {
        "id": 6,
        "x": 5,
        "y": 5,
        "color": "blue"
      }
    ],
    "walls": [
      {
        "x": 2,
        "y": 3
      }
    ],
    "moves": 18,
    "solution": [
      [
        "y",
        0,
        3
      ],
      [
        "x",
        2,
        -5
      ],
      [
        "x",
        5,
        -5
      ],
      [
        "y",
        1,
        -5
      ]
    ],
    "allFloorSolution": [
      [
        "y",
        null,
        -3
      ],
      [
        "x",
        null,
        -5
      ],
      [
        "y",
        null,
        -5
      ]
    ],
    "optimal": false,
    "theme": "nested"
  },
  {
    "name": "Начинка с обходом",
    "size": 7,
    "cells": [
      {
        "id": 0,
        "x": 0,
        "y": 0,
        "color": "green",
        "inside": {
          "id": 9,
          "color": "red"
        }
      },
      {
        "id": 1,
        "x": 1,
        "y": 0,
        "color": "green",
        "inside": {
          "id": 10,
          "color": "blue"
        }
      },
      {
        "id": 2,
        "x": 5,
        "y": 1,
        "color": "green",
        "inside": {
          "id": 11,
          "color": "red",
          "inside": {
            "id": 12,
            "color": "blue"
          }
        }
      },
      {
        "id": 3,
        "x": 0,
        "y": 4,
        "color": "red"
      },
      {
        "id": 4,
        "x": 1,
        "y": 4,
        "color": "red"
      },
      {
        "id": 5,
        "x": 5,
        "y": 4,
        "color": "red"
      },
      {
        "id": 6,
        "x": 0,
        "y": 6,
        "color": "blue"
      },
      {
        "id": 7,
        "x": 1,
        "y": 6,
        "color": "blue"
      },
      {
        "id": 8,
        "x": 6,
        "y": 6,
        "color": "blue"
      }
    ],
    "walls": [
      {
        "x": 2,
        "y": 1
      },
      {
        "x": 1,
        "y": 3
      },
      {
        "x": 3,
        "y": 5
      }
    ],
    "moves": 20,
    "solution": [
      [
        "x",
        6,
        4
      ],
      [
        "x",
        4,
        4
      ],
      [
        "y",
        5,
        -6
      ],
      [
        "x",
        0,
        4
      ],
      [
        "y",
        5,
        -6
      ]
    ],
    "allFloorSolution": [
      [
        "x",
        null,
        5
      ],
      [
        "y",
        null,
        4
      ],
      [
        "y",
        null,
        -6
      ]
    ],
    "optimal": false,
    "theme": "nested"
  }
];
if (typeof module !== 'undefined') module.exports = ConveyorLevels;
