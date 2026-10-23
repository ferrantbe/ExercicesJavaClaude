# Les questions du test du module POO, et leur export au format Moodle XML
# (23/10/2026). Relancer : python3 _moodle/question_bank/questions_POO.py ; puis, dans
# Moodle, banque de questions du cours, Import, format Moodle XML.
import html
Q=[
("Méthode main","Pour qu'une classe Java soit exécutable, que doit-elle contenir ?",
 ["une méthode <code>public static void main(String[] args)</code>","une méthode <code>Main()</code>, comme en C#","un constructeur sans paramètre","une méthode <code>run()</code>"],0,
 "N'importe quelle classe devient exécutable dès qu'elle contient une méthode <code>main</code> de cette signature exacte.","1","De C# à Java"),
("new et référence","Que fait l'instruction <code>Livre l = new Livre(\"Germinal\");</code> ?",
 ["elle crée un objet, et range dans <code>l</code> une référence vers lui","elle copie un livre existant","elle déclare une variable sans rien créer","elle crée la classe <code>Livre</code>"],0,
 "<code>new</code> crée l'objet ; la variable n'en contient que la référence, l'adresse de l'objet.","6","Primitifs et références"),
("Champs private","Pourquoi déclarer les champs d'une classe <code>private</code> ?",
 ["pour que seule la classe puisse les modifier, et garantir que l'objet reste cohérent","pour accélérer le programme","parce que Java l'impose","pour les cacher dans la Javadoc"],0,
 "C'est l'encapsulation : l'objet contrôle lui-même son état, et refuse une valeur qui n'a pas de sens.","3","Encapsulation"),
("Compteur d'instances","Un compteur qui doit compter tous les objets créés d'une classe doit être :",
 ["un champ <code>static</code>","un champ d'objet","une variable locale du constructeur","un paramètre du constructeur"],0,
 "Un champ <code>static</code> appartient à la classe : il n'existe qu'une fois, partagé par tous les objets.","4","Membres de classe : static"),
("Méthode static et this","Une méthode <code>static</code> peut-elle utiliser directement un champ d'objet, comme <code>titre</code> ?",
 ["non : elle n'est appelée sur aucun objet, elle n'a donc pas de <code>titre</code> à lire","oui, toujours","oui, si le champ est <code>public</code>","seulement dans le <code>main</code>"],0,
 "Une méthode statique n'a pas de <code>this</code> : elle appartient à la classe, pas à un objet.","4","Membres de classe : static"),
("toString","À quoi sert la redéfinition de <code>toString()</code> ?",
 ["à choisir le texte qui représente l'objet, par exemple quand on l'affiche avec <code>println</code>","à convertir un nombre en texte","à comparer deux objets","à rien : Java le fait déjà bien"],0,
 "Sans redéfinition, <code>println</code> affiche le nom de la classe suivi d'un code peu parlant.","2","Classe et objet"),
("Scanner","Pour lire un nombre entier tapé au clavier, on utilise :",
 ["un <code>Scanner</code> sur <code>System.in</code>, et sa méthode <code>nextInt()</code>","<code>System.in.readInt()</code>","<code>Console.ReadLine()</code>","<code>String.read()</code>"],0,
 "<code>Console.ReadLine()</code> est la version C# ; en Java, on passe par un <code>Scanner</code>.","5","Entrée de données au clavier"),
("Accesseurs","Faut-il écrire un accesseur et un mutateur pour chaque champ ?",
 ["non : on ne fournit que ce dont l'utilisateur de la classe a besoin","oui, c'est une règle de Java","oui, sinon le code ne compile pas","seulement pour les champs <code>static</code>"],0,
 "Un accesseur n'est pas une obligation (règle <code>CC-OBJ.2</code>) : un mutateur inutile ouvre l'objet à des modifications qu'il ne contrôle plus.","3","Encapsulation"),
("nextInt puis nextLine","Après <code>int annee = clavier.nextInt();</code>, l'instruction <code>String titre = clavier.nextLine();</code> retourne une chaîne vide sans attendre. Pourquoi ?",
 ["<code>nextInt()</code> a laissé le passage à la ligne dans le tampon, et <code>nextLine()</code> le trouve aussitôt","<code>nextLine()</code> ne fonctionne pas après une saisie de nombre","le <code>Scanner</code> doit être recréé après chaque lecture","l'utilisateur a appuyé deux fois sur Entrée"],0,
 "<code>nextInt()</code> consomme les chiffres, mais pas la fin de ligne : le <code>nextLine()</code> suivant la lit comme une ligne vide.","5","Entrée de données au clavier"),
("Deux noms, un objet","<code>Livre a = new Livre(\"Nana\"); Livre b = a; b.setTitre(\"Germinal\");</code> Que retourne ensuite <code>a.getTitre()</code> ?",
 ["\"Germinal\"","\"Nana\"","<code>null</code>","le code ne compile pas"],0,
 "<code>b = a</code> ne copie pas l'objet : les deux variables désignent le même livre. Le modifier par <code>b</code>, c'est le modifier pour <code>a</code> aussi.","6","Primitifs et références"),
("Champ final","Que garantit un champ déclaré <code>final</code>, comme <code>private final String titre;</code> ?",
 ["il reçoit sa valeur exactement une fois, à la construction, et ne change plus","il est partagé par tous les objets de la classe","il est visible de toutes les classes","il ne peut pas valoir <code>null</code>"],0,
 "<code>final</code> confie au compilateur la règle « ne change plus » ; c'est <code>static</code> qui rendrait le champ partagé.","2","Classe et objet"),
("this dans le constructeur","Dans le constructeur <code>public Livre(String titre) { this.titre = titre; }</code>, que désigne <code>this.titre</code> ?",
 ["le champ de l'objet en cours de construction","le paramètre du constructeur","une variable locale","le titre de la classe"],0,
 "Le paramètre porte le même nom que le champ ; <code>this.titre</code> désigne le champ de l'objet, <code>titre</code> seul le paramètre.","2","Classe et objet"),
("Donnée calculée","Un livre connaît son année de parution. Faut-il aussi un champ <code>age</code> ?",
 ["non : une méthode <code>getAge()</code> le calcule à la demande, à partir de l'année","oui, pour éviter de recalculer","oui, mis à jour par un setter","non, l'âge d'un livre n'a pas de sens"],0,
 "Ce qu'on peut calculer n'a pas à être stocké : un champ <code>age</code> deviendrait faux au premier janvier suivant.","3","Encapsulation"),
("Constante","Comment déclare-t-on une constante, comme le taux de TVA ?",
 ["<code>public static final double TVA = 0.21;</code>","<code>public final double TVA = 0.21;</code>","<code>public static double TVA = 0.21;</code>","<code>const double TVA = 0.21;</code>"],0,
 "Une constante a besoin des deux mots : <code>static</code>, partagée par la classe, et <code>final</code>, elle ne change plus. Son nom s'écrit en majuscules.","4","Membres de classe : static"),
("Wrapper et parseInt","Que retourne <code>Integer.parseInt(\"42\")</code> ?",
 ["l'entier <code>42</code>, de type <code>int</code>","la chaîne <code>\"42\"</code>","un objet <code>Scanner</code>","une exception, toujours"],0,
 "Les wrappers comme <code>Integer</code> offrent des méthodes utiles, dont la conversion d'un texte en nombre. Un texte qui n'est pas un nombre lèverait une exception.","7","Les wrappers"),
]
def cdata(s): return "<![CDATA["+s+"]]>"
x=['<?xml version="1.0" encoding="UTF-8"?>','<quiz>',
   '<question type="category"><category><text>$course$/top/POO - Classes et objets</text></category></question>']
for nom,txt,reps,bon,expl,sec,titre in Q:
    renvoi=f"Revoyez POO §{sec}, « {titre} », dans le support du module POO."
    x.append('<question type="multichoice">')
    x.append(f'<name><text>POO - {html.escape(nom)}</text></name>')
    x.append(f'<questiontext format="html"><text>{cdata("<p>"+txt+"</p>")}</text></questiontext>')
    x.append(f'<generalfeedback format="html"><text>{cdata("<p>"+expl+"</p>")}</text></generalfeedback>')
    x.append('<defaultgrade>1</defaultgrade><penalty>0</penalty><hidden>0</hidden><single>true</single><shuffleanswers>true</shuffleanswers><answernumbering>abc</answernumbering>')
    x.append(f'<correctfeedback format="html"><text>{cdata("<p>Exact.</p>")}</text></correctfeedback>')
    x.append(f'<incorrectfeedback format="html"><text>{cdata("<p>Pas tout à fait. "+renvoi+"</p>")}</text></incorrectfeedback>')
    for i,r in enumerate(reps):
        fb = "" if i==bon else ""
        x.append(f'<answer fraction="{100 if i==bon else 0}" format="html"><text>{cdata(r)}</text><feedback format="html"><text></text></feedback></answer>')
    x.append('</question>')
x.append('</quiz>')
open(__import__('pathlib').Path(__file__).with_name('questions_POO.xml'),'w',encoding='utf-8').write('\n'.join(x))
print(len(Q))
