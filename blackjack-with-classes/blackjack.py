from emoji import emojize

from random import sample

SUITS = ['H', 'D', 'S', 'C' ]
RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
FACE_VALUES = {'J': 10, 'Q': 10, 'K': 10, 'A': 1}


class Game:
    def __init__(self):
        self.player = Player("Rebecca")
        self.dealer = Dealer("Amy")
        self.deck = Deck()
    
    def deal_one_card(self, role):
        if role == self.player:
            self.player.hand.append(self.deck.cards.pop())
        if role == self.dealer:
            self.dealer.hand.append(self.deck.cards.pop())

    def initial_deal(self):
        while len(self.dealer.hand) < 2 and len(self.player.hand) < 2:
            self.deal_one_card(self.player)
            self.deal_one_card(self.dealer)

    def round(self):
        self.deck.shuffle()
        self.initial_deal()
        self.player.show_hand()  
        while self.player.score < 21 and self.dealer.score < 21:  
            choice = input("Would you like to (h)it or (s)tay? ")
            if choice == 'h':
                self.deal_one_card(self.player)
            self.player.show_hand()
            self.player.sum_hand()
            self.dealer.sum_hand()
            if self.dealer.score < 17:
                self.deal_one_card(self.dealer)
            print(f'Dealer has {self.dealer.score}')

        if self.player.score == 21:
            print(f'Blackjack!')
            return
        elif self.player.score > 21:
            print(f'You busted with {self.player.score}, the dealer has {self.dealer.score}')
            return
        elif self.dealer.score == 21:
            print(f'Dealer has blackjack.')
            return
        elif self.dealer.score > 21:
            print(f'Dealer busted, you had {self.player.score}')
            return

        else:
            print(f'You had {self.player.score} and the dealer had {self.dealer.score}')
            return

class Card:
    def __init__(self, rank, suit):
        self.rank = rank
        self.suit = suit
    
    def __str__(self):
        return f'{self.rank} {self.suit}'


class Deck:
    def __init__(self):
        self.cards = [Card(rank, suit) for rank in RANKS for suit in SUITS]
    
    def shuffle(self):
        self.cards = sample(self.cards, len(self.cards))

class Player:
    def __init__(self, name):
        self.name = name
        self.hand = []
        self.score = 0
    
    def __str__(self):
        return f"{self.name}"

    def sum_hand(self):
        self.score = 0
        for card in self.hand:
            if card.rank in range(1, 11):
                self.score += card.rank
            else:
                self.score += FACE_VALUES[card.rank]

    def show_hand(self):
        print("Your cards are: ", [f'{card}' for card in self.hand])

    

class Dealer:
    def __init__(self, name):
        self.name = name
        self.hand = []
        self.score = 0
    
    def __str__(self):
        return f"{self.name}"

    def sum_hand(self):
        self.score = 0
        for card in self.hand:
            if card.rank in range(1, 11):
                self.score += card.rank
            else:
                self.score += FACE_VALUES[card.rank]
    
    def show_hand(self):
        print(f"The dealer's hand is {[card for card in self.hand]}")

game = Game()
game.round()

