// Classes 

class Snake {
    constructor(blocSize, body, direction) {
        this.blocSize = blocSize;
        this.body = body;
        this.direction = direction;
        this.imgsrcHead = "";
        this.imgsrcBody = "";
    }

    drawSnake(canvasCtx) {
        for (let i = 0; i < this.body.length; i++) {
            let xCoord = this.blocSize * this.body[i][0];
            let yCoord = this.blocSize * this.body[i][1];
            if (i === 0) //La tête 
            {
                let imgHead = new Image();
                imgHead.src = this.imgsrcHead;
                imgHead.onload = function() {
                    canvasCtx.drawImage(imgHead, xCoord, yCoord);
                }

            } else //Le corps
            {
                canvasCtx.fillStyle = "Green";
                canvasCtx.fillRect(xCoord, yCoord, this.blocSize, this.blocSize);
            }


        }
    }

    advance() {
        let nextPosition = this.body[0].slice(); //copie les coordonnées de la tête

        switch (this.direction) {
            case "right":
                nextPosition[0]++; //décale la tête en x
                this.imgsrcHead = "assets/snakeheadright.png";
                break;
            case "left":
                nextPosition[0]--; //décale la tête en x
                this.imgsrcHead = "assets/snakeheadleft.png";
                break;
            case "down":
                nextPosition[1]++; //décale la tête en y
                this.imgsrcHead = "assets/snakeheadbottom.png";
                break;
            case "up":
                nextPosition[1]--; //décale la tête en y
                this.imgsrcHead = "assets/snakeheadtop.png";
                break;
            default:
                throw ("Invalid direction");

        }
        this.body.unshift(nextPosition); // ajoute un nouveau bloc en début de liste
        this.body.pop(); //enlève le dernier bloc de fin de liste
    }

    checkCollision(width, height) {
        let collision = false;
        //la tête
        let snakeHead = this.body[0]; //la tête
        let snakeRemaining = this.body.slice(1); //le corps - copie à partir de l'index 1

        //Collision aux murs
        if ((snakeHead[0] >= width) || (snakeHead[0] < 0) || (snakeHead[1] >= height) || (snakeHead[1] < 0)) {
            collision = true;
        }

        //Collision tête-corps
        for (let i = 0; i < this.body.length - 1; i++) {
            //si l'abcisse de la tête est la même que celle d'une case du corps + si l'ordonnée de la tête est la même que celle d'une case du corps
            if ((snakeHead[0] === snakeRemaining[i][0]) && (snakeHead[1] === snakeRemaining[i][1])) {
                collision = true;
            }
        }
        return collision;
    }

    checkApple(appleType, applePosition) {

        //Si la tête du serpent est sur la pomme
        if (this.body[0][0] === applePosition[0] && this.body[0][1] === applePosition[1]) {

            switch (appleType) {
                case "gala":
                    this.body.push(1); //note rentre n'importe quelle valeur semble suffir
                    break;
                case "golden":
                    this.body.push([1], [1]); //2 nouveaux blocs
                    break;
                case "granny":
                    this.body.push([1], [1], [1]); // 3 nouveaux blocs
                    break;
                case "pinkLady":
                    this.body.push([1], [1], [1], [1], [1]); // 5 nouveaux blocs
                    break;
                case "rotten":
                    this.body.push([1], [1], [1], [1], [1], [1], [1]); // 7 nouveaux blocs
                    break;
                case "scissor": //On enlève 5 blocs si le body est suffisament grand
                    if (this.body.length > 6) {
                        for (let i = 0; i < 5; i++) {
                            this.body.pop();
                        }
                    }
                    break;
                default:
                    break;

                    //Ajout de blocs au serpent selon les différentes pommes

            }
            return true;

        } else {
            return false;
        }
    }
}


class Apple {
    constructor() {
        this.blocSize = 0;
        this.position = [];
        this.value = 1;
        this.color = "";
        this.type = "";
        this.imgsrc = "";
        this.sound = "burp";
    }

    drawApple(canvasCtx) {
        //Calcul des coordonées en pixel
        let xCoord = this.blocSize * this.position[0];
        let yCoord = this.blocSize * this.position[1];

        let img = new Image();
        img.src = this.imgsrc;
        //Il faut d'abord vérifier que l'image est chargée avant de l'afficher!
        img.onload = function() {
            canvasCtx.drawImage(img, xCoord, yCoord);
        }
    }
}

class Gala extends Apple {
    constructor(blocSize, applePosition) {
        super();
        this.blocSize = blocSize;
        this.position = applePosition;
        this.value = 1;
        this.color = "red";
        this.type = "gala";
        this.imgsrc = "assets/gala-mini.png";

    }

}

class Golden extends Apple {
    constructor(blocSize, applePosition) {
        super();
        this.blocSize = blocSize;
        this.position = applePosition;
        this.value = 2;
        this.color = "yellow";
        this.type = "golden";
        this.imgsrc = "assets/golden-mini.png";

    }


}

class Granny extends Apple {
    constructor(blocSize, applePosition) {
        super();
        this.blocSize = blocSize;
        this.position = applePosition;
        this.value = 5;
        this.color = "lime";
        this.type = "granny";
        this.imgsrc = "assets/granny-mini.png";
    }
}

class Pink extends Apple {
    constructor(blocSize, applePosition) {
        super();
        this.blocSize = blocSize;
        this.position = applePosition;
        this.value = 10;
        this.color = "pink";
        this.type = "pinkLady";
        this.imgsrc = "assets/pinklady-mini.png";

    }
}

class Rotten extends Apple {
    constructor(blocSize, applePosition) {
        super();
        this.blocSize = blocSize;
        this.position = applePosition;
        this.value = -5;
        this.color = "black";
        this.type = "rotten";
        this.imgsrc = "assets/rotten-mini.png";
        this.sound = "burp2";

    }
}

class Scissor extends Apple {
    constructor(blocSize, position) {
        super();
        this.blocSize = blocSize;
        this.position = position;
        this.value = 0;
        this.type = "scissor";
        this.imgsrc = "assets/ciseau-mini.png";
        this.sound = "burp";
    }
}

//----functions----



// On renvoie un entier aléatoire entre une valeur min (incluse) et une valeur max (incluse).
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Audio
const effects = new Howl({

    "src": [
        "sound/effects.mp3",
    ],
    "sprite": {
        "burp2": [
            0,
            912.1768
        ],
        "burp": [
            2000,
            223.0340136054422,
        ],
        "camion": [
            4000,
            1560.5646258503401,
        ],
        "gameover": [
            7000,
            2209.523809523809,
        ],
        "skid": [
            11000,
            1225.0113378684807,
        ]
    }
})

const longAudio = new Howl({
    src: ["sound/longaudio.mp3"],
    volume: 0.8,
    loop: true
})


function main() {
    let ranking = [];
    getData();

    //Ecran de lancement avec un bouton start
    let gameElt = document.getElementById("game");
    let bgdElt = document.getElementById("bgd-bx");
    let rightElt = document.getElementById("copyright");
    let startGameBtn = document.getElementById("startbutton");
    let tableElt = document.getElementById("tableToFill");


    startGameBtn.addEventListener("click", () => {
        gameElt.removeChild(startGameBtn);
        bgdElt.style.display = "none";
        rightElt.style.display = "none";

        reset();
    })

    async function getData() {
        fetch("https://snake-3d05a-default-rtdb.europe-west1.firebasedatabase.app/leaderboard.json")
            .then(response => response.json())
            .then((response) => {
                ranking = response;
                displayLeaderboard();

            }).catch(function(err) {
                console.log("Problème de récupération des données : " + err.message);
            });
    }



    function displayLeaderboard() {
        let html = '';
        let i = 1;
        ranking.forEach(key => {
            html += "<tr><td>" + i + "." + "</td><td>" + key['pseudo'] + "</td><td>" + key['score'] + "</td></tr>";
            i++;
        });
        tableElt.innerHTML = html;

    }

    async function sendLeaderboard() {
        //Envoi de la requête
        const request = new XMLHttpRequest();
        request.open("PUT", "https://snake-3d05a-default-rtdb.europe-west1.firebasedatabase.app/leaderboard.json");
        request.setRequestHeader("Content-Type", "application/json");

        request.send(JSON.stringify(ranking));
        request.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                console.log("Envoi réussi");
            }
        }
    }

    function addResult(player, score, position) {
        ranking.pop();
        ranking.splice(position - 1, 0, {
            "pseudo": player,
            "score": score
        });
    }

    function reset() {
        longAudio.play();
        let blocSize = 20; //pixels
        let canvasWidthInBlocs = 30;
        let canvasHeightInBlocs = 20;
        let canvasElt = document.createElement('canvas');
        let canvasCtx = canvasElt.getContext("2d");
        let delayRefresh = 100;
        let counterDisplayScissor = 20000;
        let counterDeleteScissor = 2500;
        //Variables serpent
        let snake;
        let snakeBody = [
            [4, 2],
            [3, 2],
            [2, 2],
            [1, 2]
        ];
        let direction = "right";
        //Autres variables
        let newApple;
        let newApple2;
        let newScissor;
        let score = 0;
        let isRunning = true;
        let isSaved = false;

        //Initialisation Canvas
        initCanvas(canvasWidthInBlocs, canvasHeightInBlocs, blocSize);
        initElements();
        fillCanvas();


        function initElements() {
            snake = new Snake(blocSize, snakeBody, direction);
            newApple = initApple();
            newApple2 = initApple();
            newScissor = null;
            delayingScissor();
        }


        function initCanvas(width, height, bloc) {
            canvasElt.width = width * bloc;
            canvasElt.height = height * bloc;
            gameElt.appendChild(canvasElt);

        }

        function fillCanvas() {

            //S'il y a une collision - fin de partie
            if (snake.checkCollision(canvasWidthInBlocs, canvasHeightInBlocs)) {
                isRunning = false;

                canvasCtx.save(); //sauvegarde le contexte
                canvasCtx.font = "30px arial";
                canvasCtx.fillStyle = "Grey";
                canvasCtx.fillText("GAME OVER", 205, 170);
                canvasCtx.fillText("Appuyez sur Entrée pour rejouer.", 90, 220);

                canvasCtx.restore(); // restaure le contexte pour récupérer les polices d'origine
                longAudio.stop();
                effects.stop();
                effects.play("gameover");
                //Vérification du score / enregistrement
                getData().then(() => {
                    let i = 1;
                    ranking.forEach(row => {
                        if (score > row["score"] && !isSaved) {
                            let nickname = prompt("Félicitation, c'est un nouveau record! Veuillez entrer votre nom : ");
                            if (nickname !== null) {
                                addResult(nickname, score, i);
                                sendLeaderboard();
                                setTimeout(() => { getData() }, 1500);

                            }
                            isSaved = true;

                        }
                        i++;
                    });
                });


            } else {
                snake.advance();
                //Si une pomme est mangée, on en créé une nouvelle qui ne doit pas être sur le serpent
                if (snake.checkApple(newApple.type, newApple.position)) {
                    do {

                        score += newApple.value;
                        effects.play(newApple.sound);
                        newApple = initApple();
                        newApple2 = initApple();
                    } while (isOnSnake());
                }
                if (snake.checkApple(newApple2.type, newApple2.position)) {
                    do {
                        score += newApple2.value;
                        effects.play(newApple2.sound);
                        newApple = initApple();
                        newApple2 = initApple();
                    } while (isOnSnake());
                }
                //Si le ciseau est mangé ( s'il existe )
                if (newScissor != null) {
                    if (snake.checkApple(newScissor.type, newScissor.position)) {
                        do {
                            effects.play(newScissor.sound);
                            //On supprime le ciseau , je mets un délai ici afin d'éviter que le ciseau devienne instantanément nul
                            //ce qui fais planter le jeu, car la tete n'a pas encore avancée
                            setTimeout(() => {
                                newScissor = null;
                            }, delayRefresh);
                        } while (isOnSnake());
                    }
                }
                //effacer le contenu du canvas
                canvasCtx.clearRect(0, 0, canvasElt.width, canvasElt.height);
                //afficher le serpent dans le canvas
                snake.drawSnake(canvasCtx);
                //afficher les pommes dans le canvas et le ciseau  
                newApple.drawApple(canvasCtx);
                newApple2.drawApple(canvasCtx);
                if (newScissor != null) {
                    newScissor.drawApple(canvasCtx);
                }

                canvasCtx.save();
                canvasCtx.font = "15px arial";
                canvasCtx.fillStyle = "#333333";
                canvasCtx.fillText("Score : " + score.toString(), 5, canvasElt.height - 5);
                canvasCtx.restore();

                //refresh
                setTimeout(fillCanvas, delayRefresh);
            }
        }

        //Le ciseau est créé ( apparaitra )après un délai et disparait aussi après un temps
        function delayingScissor() {
            setTimeout(() => {
                newScissor = initScissor();
                setTimeout(() => {
                    newScissor = null;
                    delayingScissor();
                }, counterDeleteScissor);
            }, counterDisplayScissor);
        }

        function initScissor() {
            let xRandom = getRandomIntInclusive(0, canvasWidthInBlocs - 1);
            let yRandom = getRandomIntInclusive(0, canvasHeightInBlocs - 1);
            let scissorPosition = [xRandom, yRandom];
            let scissor = new Scissor(blocSize, scissorPosition);
            return scissor;
        }

        //Création des coordonnées de la pomme aléatoire
        function initApple() {
            let apple;
            let xRandom = getRandomIntInclusive(0, canvasWidthInBlocs - 1);
            let yRandom = getRandomIntInclusive(0, canvasHeightInBlocs - 1);
            let applePosition = [xRandom, yRandom];
            //Type de pomme créée en fonction d'une valeur aléatoire
            let typeRandom = getRandomIntInclusive(1, 20)
            switch (typeRandom) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    apple = new Gala(blocSize, applePosition);
                    return apple;
                case 10:
                case 11:
                case 12:
                case 13:
                case 14:
                    apple = new Golden(blocSize, applePosition);
                    return apple;
                case 15:
                case 16:
                case 17:
                    apple = new Granny(blocSize, applePosition);
                    return apple;
                case 18:
                case 19:
                    apple = new Rotten(blocSize, applePosition);
                    return apple;
                case 20:
                    apple = new Pink(blocSize, applePosition);
                    return apple;
                default:
                    break;
            }

            function sendForm(data) {
                console.log('send');
                //Envoi de la requête
                const request = new XMLHttpRequest();
                request.open("PUT", "https://snake-3d05a-default-rtdb.europe-west1.firebasedatabase.app/leaderboard.json");
                //Envoi de données dans la requête sous forme de document JSON
                request.setRequestHeader("Content-Type", "application/json"); //on prépare le service à recevoir du JSON
                request.send(JSON.stringify(data)); //on transforme notre élément javascript en JSON en on envoi
            }

        }
        //Retourne un booléen en fonction de la position de la pomme par rapport au serpent
        function isOnSnake() {
            for (let i = 0; i < snake.body.length; i++) {

                if ((newApple.position[0] === snake.body[i][0]) &&
                    (newApple.position[1] === snake.body[i][1])) {
                    return true;
                }
                if ((newApple2.position[0] === snake.body[i][0]) &&
                    (newApple2.position[1] === snake.body[i][1])) {
                    return true;
                }
            }
            return false;
        }
        //Assignement des touches du clavier
        document.onkeydown = function(e) {
            switch (e.keyCode) {
                case 13: //Entree
                    if (!isRunning) {
                        event.preventDefault();
                        gameElt.removeChild(canvasElt);
                        reset();
                    }
                    break;
                case 17: //Ctrl
                    if (isRunning) {
                        event.preventDefault();
                        effects.play("camion");
                    }
                    break;
                case 32: //Espace
                    if (isRunning) {
                        event.preventDefault();
                        alert("Pause");
                    }
                    break;
                default:
                    break;
            }

            if ((snake.direction === "up") || (snake.direction === "down")) {
                switch (e.keyCode) {
                    case 37: //gauche
                        event.preventDefault();
                        snake.direction = "left";
                        break;
                    case 39: //droite
                        event.preventDefault();
                        snake.direction = "right";
                        break;
                    default:
                        return;
                }
            } else {
                switch (e.keyCode) {
                    case 38: //haut
                        event.preventDefault();
                        snake.direction = "up";
                        break;
                    case 40: //bas
                        event.preventDefault();
                        snake.direction = "down";
                        break;
                    default:
                        return;
                }
            }
        }
    }
}

main();