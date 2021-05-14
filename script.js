(function () {
    var currentPlayer = "player1";
    var slots = $(".slot");
    var close = $(".close");
    var modal = $("#modal");
    var button = $("button");

    $(".column").on("click", function (e) {
        var col = $(e.currentTarget);
        var slotsInCol = col.children();

        for (var i = slotsInCol.length - 1; i >= 0; i--) {
            //console.log("slotsInColEQ", slotsInCol.eq(i));
            if (
                !slotsInCol.eq(i).hasClass("player1") &&
                !slotsInCol.eq(i).hasClass("player2")
            ) {
                // console.log("slot must be free, add current player");
                slotsInCol.eq(i).addClass(currentPlayer);
                break;
            }
        }
        // console.log("i", i);
        if (i === -1) {
            return;
        }
        var slotsInRow = $(".row" + i);
        if (checkForVictory(slotsInCol)) {
            console.log("col victory!!");
            modal.eq(0).css({ visibility: "visible" });
            setTimeout(function () {
                alert("We have a winner 🥳");
            }, 500);
        } else if (checkForVictory(slotsInRow)) {
            console.log("row victory!!");
            setTimeout(function () {
                alert("We have a winner 🥳");
            }, 300);

            modal.eq(0).css({ visibility: "visible" });
        } else if (checkForDiags(slots)) {
            console.log("diag victory!!");
            setTimeout(function () {
                alert("We have a winner 🥳");
            }, 300);
            modal.eq(0).css({ visibility: "visible" });
        }

        function switchPlayer() {
            currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
            $(".player1, .hole")
                .css({
                    backgroundColor: "#ffc2d5",
                    // borderRadius: "50%",
                })
                .addClass("fall");
            $(".player2, .hole")
                .css({
                    backgroundColor: "#c5dedd",
                    // borderRadius: "50%",
                })
                .addClass("fall");
        }
        switchPlayer();
    });
    function checkForVictory(slots) {
        var winner = [];
        var count = 0;
        for (var i = 0; i < slots.length; i++) {
            //  console.log("slots.eq(i).hassClass; ", slots.eq(i).hasClass(currentPlayer));
            if (slots.eq(i).hasClass(currentPlayer)) {
                count++;
                winner.push(slots.eq(i));
                if (count === 4) {
                    console.log("winner push", winner);
                    winner.forEach((slot) => {
                        console.log("slots", slot);
                        $(slot).css({
                            border: "3px #7eff06 solid",
                        });
                    });
                    return true;
                }
            } else {
                count = 0;
            }
        }
    }

    function checkForDiags(slots) {
        var diags = [
            [0, 7, 14, 21],
            [1, 8, 15, 22],
            [2, 9, 16, 23],
            [3, 8, 13, 18],
            [4, 9, 14, 19],
            [5, 10, 15, 20],
            [6, 13, 20, 27],
            [7, 14, 21, 28],
            [8, 15, 22, 29],
            [9, 14, 19, 24],
            [10, 15, 20, 25],
            [11, 16, 21, 26],
            [12, 19, 26, 33],
            [13, 20, 27, 34],
            [14, 21, 28, 35],
            [15, 20, 25, 30],
            [16, 21, 26, 31],
            [17, 22, 27, 32],
            [18, 25, 32, 39],
            [19, 26, 33, 40],
            [20, 27, 34, 41],
            [21, 26, 31, 36],
            [22, 27, 32, 37],
            [23, 28, 33, 38],
        ];
        for (var j = 0; j < diags.length; j++) {
            var diag1 = diags[j][0];
            var diag2 = diags[j][1];
            var diag3 = diags[j][2];
            var diag4 = diags[j][3];
            // console.log(diag1);

            if (
                slots.eq(diag1).hasClass(currentPlayer) &&
                slots.eq(diag2).hasClass(currentPlayer) &&
                slots.eq(diag3).hasClass(currentPlayer) &&
                slots.eq(diag4).hasClass(currentPlayer)
            ) {
                console.log("player wins: ", currentPlayer);
                setTimeout(function () {
                    alert("We have a winner 🥳");
                }, 300);
                $(slots.eq(diag1)).css({
                    border: "3px #7eff06 solid",
                });
                $(slots.eq(diag2)).css({
                    border: "3px #7eff06 solid",
                });
                $(slots.eq(diag3)).css({
                    border: "3px #7eff06 solid",
                });
                $(slots.eq(diag4)).css({
                    border: "3px #7eff06 solid",
                });
                modal.eq(0).css({ visibility: "visible" });
            }
        }
    }

    //basic game ends here

    close.on("click", function () {
        console.log("clicked");
        modal.remove();
    });

    button.on("click", function () {
        location.reload();
    });

    // function keyCodes(e) {
    //     var left = e.keyCode;
    //     if (left == 37) {
    //         alert("left!");
    //     }
    // }
    // keyCodes(e);

    // function myFunction(event) {
    //     var x = event.keyCode;
    //     if (x == 27) {
    //         // 27 is the ESC key
    //         alert("You pressed the Escape key!");
    //     }
    // }

    // myFunction();
})();
