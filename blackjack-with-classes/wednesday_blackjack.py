from random import sample

SUITS = ['D', 'H', 'S', 'C']
RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
FACE_VALUES = {'J': 10, 'Q':10, 'K':10, 'A':11, 'lowA': 1}
# for this iteration, A is always 11

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
    
    def play_round(self, game):
        self.show_hand()
        choice = input('Would you like to (h)it or (s)tay? ')
        if choice == 'h':
            game.deck.deal_one_card(self)
        game.update_score(self)
        self.show_hand()
        return choice


class Dealer:
    def __init__(self, name):
        self.name = name
        self.hand = []
        self.score = 0

    def __str__(self):
        return f'{self.name}'
    
    def show_hand(self):
        print("Dealer's cards are: ", [f'{card}' for card in self.hand])
    
    def play_round(self, game):
        if self.score < 17:
            game.deck.deal_one_card(self)
        game.update_score(self)
        self.show_hand()


class Game:
    def __init__(self):
        self.player = Player("Rebecca")
        self.dealer = Dealer("Amy")
        self.deck = Deck()
    
    def initial_deal(self):
        """Deals two cards each to player and dealer"""
        self.deck.shuffle()
        for i in range(2):
            self.deck.deal_one_card(self.player)
            self.deck.deal_one_card(self.dealer)
    
    def play(self):
        while self.player.score < 21 and self.dealer.score < 21: 
            choice = self.player.play_round(self)
            if self.player.score == 21:
                print(f'Blackjack!')
                return
            self.dealer.play_round(self)
            if self.dealer.score == 21:
                print(f'Dealer has blackjack. You had {self.player.score}')
                return
            if choice == 's' and 16 < self.dealer.score < 22:
                break
        print(self.dealer.score, self.player.score)
        if self.dealer.score == self.player.score:
            print(f"It's a tie")
        if self.player.score < self.dealer.score < 22:
            print(f'Dealer won with {self.dealer.score}, you have {self.player.score}')
            return
        elif self.dealer.score < self.player.score < 22:
            print(f'You won with {self.player.score}, dealer has {self.dealer.score}')
            return
        elif self.player.score > 21 and self.dealer.score < 22:
            for card in self.player.hand:
                if card.rank == 'A':
                    self.player.hand.remove(card)
                    low_ace = Card('lowA', card.suit)
                    self.player.hand.append(low_ace)
                    self.update_score(self.player)
                    if self.player.score < 21:
                        self.play()
            print(f'You busted with {self.player.score}, the dealer has {self.dealer.score}')
            return
        elif self.dealer.score > 21 and self.player.score < 22:
            for card in self.player.hand:
                if card.rank == 'A':
                    self.dealer.hand.remove(card)
                    low_ace = Card('lowA', card.suit)
                    self.dealer.hand.append(low_ace)
                self.update_score(self.dealer)
                if self.dealer.score < 21:
                    self.play()
            print(f'Dealer busted with {self.dealer.score}, you had {self.player.score}')
            return
        elif self.dealer.score > 21 and self.player.score > 21:
            print("You both busted")
            return
            
    def update_score(self, participant):
        """Calculates the value of a participant's hand at a point in time"""
        participant.score = 0
        for card in participant.hand:
            if card.rank in range(1, 11):
                participant.score += card.rank
            else:
                participant.score += FACE_VALUES[card.rank]

game = Game()
game.initial_deal()
game.play()

