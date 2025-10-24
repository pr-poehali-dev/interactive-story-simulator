import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Character {
  id: string;
  name: string;
  description: string;
  personality: string;
  imageUrl?: string;
}

interface Game {
  id: string;
  title: string;
  description: string;
  genre: string;
  characters: string[];
  lastPlayed?: string;
}

const Index = () => {
  const [currentSection, setCurrentSection] = useState<'home' | 'games' | 'characters' | 'create' | 'profile'>('home');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [newCharacter, setNewCharacter] = useState({ name: '', description: '', personality: '' });
  const [newGame, setNewGame] = useState({ title: '', description: '', genre: '' });

  const addCharacter = () => {
    if (newCharacter.name && newCharacter.description) {
      setCharacters([...characters, { id: Date.now().toString(), ...newCharacter }]);
      setNewCharacter({ name: '', description: '', personality: '' });
    }
  };

  const deleteCharacter = (id: string) => {
    setCharacters(characters.filter(char => char.id !== id));
  };

  const createGame = () => {
    if (newGame.title && newGame.description) {
      setGames([...games, { 
        id: Date.now().toString(), 
        ...newGame, 
        characters: [],
        lastPlayed: new Date().toLocaleDateString('ru-RU')
      }]);
      setNewGame({ title: '', description: '', genre: '' });
    }
  };

  const deleteGame = (id: string) => {
    setGames(games.filter(game => game.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-red-orange flex items-center justify-center">
              <Icon name="BookOpen" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI RPG STORY
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setCurrentSection('home')}
              className={`flex items-center gap-2 transition-colors ${currentSection === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name="Home" size={20} />
              <span>Главная</span>
            </button>
            <button 
              onClick={() => setCurrentSection('games')}
              className={`flex items-center gap-2 transition-colors ${currentSection === 'games' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name="Gamepad2" size={20} />
              <span>Мои игры</span>
            </button>
            <button 
              onClick={() => setCurrentSection('characters')}
              className={`flex items-center gap-2 transition-colors ${currentSection === 'characters' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name="Users" size={20} />
              <span>Персонажи</span>
            </button>
            <button 
              onClick={() => setCurrentSection('create')}
              className={`flex items-center gap-2 transition-colors ${currentSection === 'create' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Icon name="Plus" size={20} />
              <span>Создать игру</span>
            </button>
          </nav>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icon name="MoreVertical" size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setCurrentSection('profile')}>
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="Settings" size={16} className="mr-2" />
                Настройки
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="Sparkles" size={16} className="mr-2" />
                AI Модели
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icon name="LogOut" size={16} className="mr-2" />
                Выход
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {currentSection === 'home' && (
          <div className="animate-fade-in space-y-8">
            <section className="text-center space-y-4 py-12">
              <h2 className="text-5xl font-bold">Создавайте свои миры</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Интерактивная текстовая RPG с нейросетями. Общайтесь с AI-персонажами, создавайте сюжеты и живите в своих историях
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button onClick={() => setCurrentSection('create')} size="lg" className="gradient-red-orange border-0">
                  <Icon name="Plus" size={20} className="mr-2" />
                  Создать игру
                </Button>
                <Button onClick={() => setCurrentSection('characters')} size="lg" variant="outline">
                  <Icon name="Users" size={20} className="mr-2" />
                  Мои персонажи
                </Button>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-2xl font-semibold">AI Возможности</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <Icon name="Brain" size={32} className="text-primary mb-2" />
                    <CardTitle>Claude AI</CardTitle>
                    <CardDescription>Haiku, Sonnet, Opus для генерации диалогов</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:border-secondary/50 transition-colors">
                  <CardHeader>
                    <Icon name="MessageSquare" size={32} className="text-secondary mb-2" />
                    <CardTitle>ChatGPT</CardTitle>
                    <CardDescription>Умные персонажи и сюжеты</CardDescription>
                  </CardHeader>
                </Card>
                <Card className="hover:border-accent/50 transition-colors">
                  <CardHeader>
                    <Icon name="Image" size={32} className="text-accent mb-2" />
                    <CardTitle>Генерация изображений</CardTitle>
                    <CardDescription>Stable Diffusion и Midjourney</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </section>
          </div>
        )}

        {currentSection === 'games' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Мои игры</h2>
              <Button onClick={() => setCurrentSection('create')} className="gradient-red-orange border-0">
                <Icon name="Plus" size={20} className="mr-2" />
                Новая игра
              </Button>
            </div>
            
            {games.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="Gamepad2" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">У вас пока нет игр</p>
                <Button onClick={() => setCurrentSection('create')} className="mt-4 gradient-red-orange border-0">
                  Создать первую игру
                </Button>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {games.map((game) => (
                  <Card key={game.id} className="hover:border-primary/50 transition-all hover:scale-105">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <CardTitle>{game.title}</CardTitle>
                          <Badge variant="outline" className="text-xs">{game.genre}</Badge>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Icon name="MoreVertical" size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Icon name="Play" size={16} className="mr-2" />
                              Играть
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Icon name="Edit" size={16} className="mr-2" />
                              Редактировать
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteGame(game.id)} className="text-destructive">
                              <Icon name="Trash2" size={16} className="mr-2" />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription className="line-clamp-2">{game.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>Последняя игра: {game.lastPlayed}</span>
                        <Button size="sm" className="gradient-red-orange border-0">
                          <Icon name="Play" size={16} className="mr-1" />
                          Играть
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {currentSection === 'characters' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Мои персонажи</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gradient-red-orange border-0">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Создать персонажа
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Новый персонаж</DialogTitle>
                    <DialogDescription>Создайте уникального персонажа для ваших историй</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="char-name">Имя персонажа</Label>
                      <Input 
                        id="char-name"
                        value={newCharacter.name}
                        onChange={(e) => setNewCharacter({...newCharacter, name: e.target.value})}
                        placeholder="Эльдар Темный" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="char-desc">Описание</Label>
                      <Textarea 
                        id="char-desc"
                        value={newCharacter.description}
                        onChange={(e) => setNewCharacter({...newCharacter, description: e.target.value})}
                        placeholder="Древний маг, хранитель забытых знаний..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="char-personality">Характер</Label>
                      <Textarea 
                        id="char-personality"
                        value={newCharacter.personality}
                        onChange={(e) => setNewCharacter({...newCharacter, personality: e.target.value})}
                        placeholder="Мудрый, но загадочный. Говорит загадками..."
                        rows={3}
                      />
                    </div>
                  </div>
                  <Button onClick={addCharacter} className="w-full gradient-red-orange border-0">
                    Создать персонажа
                  </Button>
                </DialogContent>
              </Dialog>
            </div>

            {characters.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="Users" size={64} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-xl text-muted-foreground">У вас пока нет персонажей</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="mt-4 gradient-red-orange border-0">
                      Создать первого персонажа
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Новый персонаж</DialogTitle>
                      <DialogDescription>Создайте уникального персонажа для ваших историй</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="char-name-2">Имя персонажа</Label>
                        <Input 
                          id="char-name-2"
                          value={newCharacter.name}
                          onChange={(e) => setNewCharacter({...newCharacter, name: e.target.value})}
                          placeholder="Эльдар Темный" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="char-desc-2">Описание</Label>
                        <Textarea 
                          id="char-desc-2"
                          value={newCharacter.description}
                          onChange={(e) => setNewCharacter({...newCharacter, description: e.target.value})}
                          placeholder="Древний маг, хранитель забытых знаний..."
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="char-personality-2">Характер</Label>
                        <Textarea 
                          id="char-personality-2"
                          value={newCharacter.personality}
                          onChange={(e) => setNewCharacter({...newCharacter, personality: e.target.value})}
                          placeholder="Мудрый, но загадочный. Говорит загадками..."
                          rows={3}
                        />
                      </div>
                    </div>
                    <Button onClick={addCharacter} className="w-full gradient-red-orange border-0">
                      Создать персонажа
                    </Button>
                  </DialogContent>
                </Dialog>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map((character) => (
                  <Card key={character.id} className="hover:border-primary/50 transition-all hover:scale-105">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                            <Icon name="User" size={24} className="text-white" />
                          </div>
                          <CardTitle>{character.name}</CardTitle>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Icon name="MoreVertical" size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Icon name="Edit" size={16} className="mr-2" />
                              Редактировать
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteCharacter(character.id)} className="text-destructive">
                              <Icon name="Trash2" size={16} className="mr-2" />
                              Удалить
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription className="line-clamp-3 mt-2">{character.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        <strong>Характер:</strong> {character.personality}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {currentSection === 'create' && (
          <div className="animate-fade-in max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Создать игру</h2>
            <Card>
              <CardHeader>
                <CardTitle>Новая игра</CardTitle>
                <CardDescription>AI-мастер поможет создать уникальный сюжет на основе вашего описания</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="game-title">Название игры</Label>
                  <Input 
                    id="game-title"
                    value={newGame.title}
                    onChange={(e) => setNewGame({...newGame, title: e.target.value})}
                    placeholder="Хроники Темного леса"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="game-genre">Жанр</Label>
                  <Input 
                    id="game-genre"
                    value={newGame.genre}
                    onChange={(e) => setNewGame({...newGame, genre: e.target.value})}
                    placeholder="Фэнтези, Мистика, Приключения..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="game-desc">Описание мира</Label>
                  <Textarea 
                    id="game-desc"
                    value={newGame.description}
                    onChange={(e) => setNewGame({...newGame, description: e.target.value})}
                    placeholder="Опишите ваш мир: обстановку, конфликты, ключевые локации. AI-мастер создаст уникальный сюжет на основе вашего описания..."
                    rows={6}
                  />
                </div>
                
                <div className="border border-border rounded-lg p-4 bg-muted/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Sparkles" size={20} className="text-primary" />
                    <h4 className="font-semibold">AI-мастер</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Искусственный интеллект проанализирует ваше описание и создаст увлекательный сюжет с неожиданными поворотами, 
                    интересными персонажами и запоминающимися локациями.
                  </p>
                </div>

                <Button onClick={createGame} className="w-full gradient-red-orange border-0" size="lg">
                  <Icon name="Wand2" size={20} className="mr-2" />
                  Создать игру с AI
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {currentSection === 'profile' && (
          <div className="animate-fade-in max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Профиль</h2>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="account">Аккаунт</TabsTrigger>
                <TabsTrigger value="ai">AI Модели</TabsTrigger>
                <TabsTrigger value="stats">Статистика</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Информация об аккаунте</CardTitle>
                    <CardDescription>Управление вашим профилем</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full gradient-red-orange flex items-center justify-center">
                        <Icon name="User" size={40} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">Игрок</h3>
                        <p className="text-sm text-muted-foreground">player@rpgstory.ai</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="ai" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Доступные AI модели</CardTitle>
                    <CardDescription>Выберите модели для генерации контента</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="Brain" size={24} className="text-primary" />
                        <div>
                          <p className="font-medium">Claude Haiku</p>
                          <p className="text-xs text-muted-foreground">Быстрые ответы</p>
                        </div>
                      </div>
                      <Badge>Активна</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="Brain" size={24} className="text-primary" />
                        <div>
                          <p className="font-medium">Claude Sonnet</p>
                          <p className="text-xs text-muted-foreground">Баланс скорости и качества</p>
                        </div>
                      </div>
                      <Badge>Активна</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="Brain" size={24} className="text-primary" />
                        <div>
                          <p className="font-medium">Claude Opus</p>
                          <p className="text-xs text-muted-foreground">Максимальное качество</p>
                        </div>
                      </div>
                      <Badge>Активна</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="MessageSquare" size={24} className="text-secondary" />
                        <div>
                          <p className="font-medium">ChatGPT-4</p>
                          <p className="text-xs text-muted-foreground">Диалоги и сюжеты</p>
                        </div>
                      </div>
                      <Badge>Активна</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="stats" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Ваша статистика</CardTitle>
                    <CardDescription>Активность и достижения</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 border border-border rounded-lg text-center">
                        <p className="text-3xl font-bold text-primary">{games.length}</p>
                        <p className="text-sm text-muted-foreground">Игр создано</p>
                      </div>
                      <div className="p-4 border border-border rounded-lg text-center">
                        <p className="text-3xl font-bold text-secondary">{characters.length}</p>
                        <p className="text-sm text-muted-foreground">Персонажей</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      <footer className="border-t border-border/40 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>AI RPG Story © 2024. Создавайте свои миры с искусственным интеллектом</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
