from random import sample

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

    def deal_one_card(self, participant):
        card = self.cards.pop()
        participant.hand.append(card)

    def shuffle(self):
        self.cards = sample(self.cards, len(self.cards))


class Card:
    def __init__(self, rank, suit):
        self.rank = rank
        self.suit = suit
    
    def __str__(self):
        return f'{self.rank} of {self.suit}'


class Player:
    def __init__(self, name):
        self.name = name
        self.hand = []
        self.score = 0

    def __str__(self):
        return f'{self.name}'
    
    def show_hand(self):
        print("Your cards are: ", [f'{card}' for card in self.hand])

    def sum_hand(self):


class Dealer:
        self.name = name
        self.hand = []
        self.score = 0

    def __str__(self):
        return f'{self.name}'

class Game:
    def __init__(self):
        self.player = Player("Rebecca")
        self.dealer = Dealer("Amy")
        self.deck = Deck()
    
    def initial_deal(self):
        self.deck.shuffle()
        self.deck.deal_one_card(self.player)
        self.deck.deal_one_card(self.dealer)
        self.deck.deal_one_card(self.player)
        self.deck.deal_one_card(self.dealer)
    
    def round(self):
        self.player.show_hand()
        choice = input("Do you want to (h)it or (s)tay?")
        if choice == 'h':
            self.deck.deal_one_card(self.player)




