SUITS = ['D', 'H', 'S', 'C']
RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
FACE_VALUES = {'J': 10, 'Q':10, 'K':10, 'A':1}

class Deck:
    def __init__(self):
        self.cards = [Card(rank, suit) for suit in SUITS for rank in RANKS]
        # same as
        # self.cards = []
        # for suit in SUITS:
        #     for rank in RANKS
        #         self.cards.append(Card(suit, rank))
                

class Card:
    def __init__(self, rank, suite):
        self.rank = rank
        self.suit = suit

        

class Player:
    def __init__(self):
    pass

class Dealer:
    def __init__(self):
    pass
