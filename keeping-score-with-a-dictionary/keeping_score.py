# simple game modeling catching the ball and keeping score

test_name_list = ["Dee", "Dan", "Ryan"]

def make_scorecard(names):
    """creates a scorecard where everyone starts with 0 points"""
    score_dict = {}
    for name in names:
        print(name)
        score_dict[name] = 0
    return(score_dict)

def update_score(scorecard):
    """gives each player one point per round"""
    for name, score in scorecard.items():
        scorecard[name] = score + 1
    print(scorecard)


def play_game():
    """play a three-round game in which everyone gets a point per game"""
    scorecard = make_scorecard(test_name_list)
    for i in range(3):
        update_score(scorecard)

play_game()