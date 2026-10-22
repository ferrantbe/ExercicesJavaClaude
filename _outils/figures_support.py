#!/usr/bin/env python3
"""
figures_support.py — les schemas du support de cours, dessines en PNG
(_support/figures), en noir et gris : lisibles imprimes en noir et blanc.

    python3 _outils/figures_support.py

Chaque figure est une fonction ; les schemas des decks qui portent un sens
(objets en memoire, references, champs statiques) y sont redessines
proprement, plutot que copies depuis les slides (20/10/2026).
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RACINE = Path(__file__).resolve().parent.parent
SORTIE = RACINE / "_support/figures"
POLICES = "/usr/share/fonts/truetype/dejavu/"
MONO = ImageFont.truetype(POLICES + "DejaVuSansMono.ttf", 30)
MONO_GRAS = ImageFont.truetype(POLICES + "DejaVuSansMono-Bold.ttf", 30)
TEXTE = ImageFont.truetype(POLICES + "DejaVuSans.ttf", 28)
TEXTE_IT = ImageFont.truetype(POLICES + "DejaVuSans-Oblique.ttf", 28)

NOIR, GRIS, GRIS_CLAIR, FOND = (30, 30, 30), (110, 110, 110), (225, 225, 225), (245, 245, 245)


class Figure:
    def __init__(self, largeur, hauteur):
        self.im = Image.new("RGB", (largeur, hauteur), "white")
        self.d = ImageDraw.Draw(self.im)

    def texte(self, x, y, t, police=TEXTE, couleur=NOIR, centre=False):
        if centre:
            w = self.d.textlength(t, font=police)
            x -= w / 2
        self.d.text((x, y), t, font=police, fill=couleur)

    def variable(self, x, y, decl, contenu=None, largeur=230):
        """Une variable : sa declaration au-dessus, sa case en dessous."""
        self.texte(x + largeur / 2, y, decl, MONO_GRAS, centre=True)
        self.d.rectangle([x, y + 44, x + largeur, y + 104], outline=NOIR, width=3, fill="white")
        if contenu is not None:
            self.texte(x + largeur / 2, y + 56, contenu, MONO, centre=True)
        return (x + largeur / 2, y + 74)          # centre de la case

    def objet(self, x, y, titre, champs, largeur=300):
        """Un objet en memoire : un cartouche gris et ses champs."""
        h = 56 + 56 * len(champs)
        self.d.rounded_rectangle([x, y, x + largeur, y + h], radius=14, outline=NOIR, width=3, fill=FOND)
        self.d.line([x, y + 52, x + largeur, y + 52], fill=NOIR, width=2)
        self.texte(x + largeur / 2, y + 10, titre, TEXTE_IT, GRIS, centre=True)
        for k, (nom, val) in enumerate(champs):
            yy = y + 60 + 56 * k
            self.texte(x + 16, yy + 6, nom, MONO)
            lv = max(96, self.d.textlength(val, font=MONO) + 28)
            self.d.rectangle([x + largeur - 14 - lv, yy, x + largeur - 14, yy + 44], outline=NOIR, width=2, fill="white")
            self.texte(x + largeur - 14 - lv / 2, yy + 6, val, MONO, centre=True)
        return (x, y, x + largeur, y + h)

    def fleche(self, a, b, couleur=NOIR, pointillee=False):
        (x1, y1), (x2, y2) = a, b
        if pointillee:
            n = 18
            for k in range(0, n, 2):
                self.d.line([x1 + (x2 - x1) * k / n, y1 + (y2 - y1) * k / n,
                             x1 + (x2 - x1) * (k + 1) / n, y1 + (y2 - y1) * (k + 1) / n], fill=couleur, width=4)
        else:
            self.d.line([a, b], fill=couleur, width=4)
        import math
        ang = math.atan2(y2 - y1, x2 - x1)
        p1 = (x2 - 22 * math.cos(ang - 0.4), y2 - 22 * math.sin(ang - 0.4))
        p2 = (x2 - 22 * math.cos(ang + 0.4), y2 - 22 * math.sin(ang + 0.4))
        self.d.polygon([b, p1, p2], fill=couleur)
        self.d.ellipse([x1 - 7, y1 - 7, x1 + 7, y1 + 7], fill=couleur)

    def bulle(self, x, y, t):
        w = self.d.textlength(t, font=TEXTE) + 40
        self.d.rounded_rectangle([x, y, x + w, y + 52], radius=12, outline=GRIS, width=2, fill=GRIS_CLAIR)
        self.texte(x + 20, y + 10, t)

    def enregistrer(self, nom):
        SORTIE.mkdir(parents=True, exist_ok=True)
        self.im.save(SORTIE / nom, dpi=(220, 220))
        print(nom, self.im.size)


# ---------------------------------------------------------------------------
#  Module POO
# ---------------------------------------------------------------------------

def poo_compilation():
    f = Figure(1600, 230)
    etapes = [(".java", "le code source"), ("javac", "le compilateur"), (".class", "le bytecode"), ("JVM", "l'exécution")]
    for k, (t, s) in enumerate(etapes):
        x = 30 + k * 400
        f.d.rounded_rectangle([x, 40, x + 300, 190], radius=16, outline=NOIR, width=3, fill=FOND if k % 2 else "white")
        f.texte(x + 150, 70, t, MONO_GRAS, centre=True)
        f.texte(x + 150, 125, s, TEXTE, GRIS, centre=True)
        if k < 3:
            f.fleche((x + 312, 115), (x + 388, 115))
    f.enregistrer("poo-compilation.png")


def poo_champs_objet():
    f = Figure(1500, 470)
    f.texte(30, 10, "A a1 = new A();    A a2 = new A();", MONO)
    for k, nom in enumerate(("a1", "a2")):
        x = 80 + k * 720
        c = f.variable(x, 90, f"A {nom}", None, 200)
        o = f.objet(x + 300, 200, "un objet A", [("int n", "0"), ("float y", "0.0")], 330)
        f.fleche((c[0], c[1]), (o[0] + 40, o[1]))
    f.enregistrer("poo-champs-objet.png")


def poo_champ_classe():
    f = Figure(1500, 560)
    f.texte(30, 10, "B b1 = new B();    B b2 = new B();", MONO)
    for k, nom in enumerate(("b1", "b2")):
        x = 80 + k * 720
        c = f.variable(x, 90, f"B {nom}", None, 200)
        o = f.objet(x + 300, 200, "un objet B", [("float y", "0.0")], 330)
        f.fleche((c[0], c[1]), (o[0] + 40, o[1]))
        # chaque objet « voit » le n de la classe
        f.fleche(((o[0] + o[2]) / 2, o[3] + 6), (640 + k * 220, 398), GRIS, pointillee=True)
    # le champ de classe, partage
    f.d.rounded_rectangle([520, 400, 980, 530], radius=14, outline=NOIR, width=4, fill=GRIS_CLAIR)
    f.texte(750, 408, "la classe B : un seul n", TEXTE_IT, GRIS, centre=True)
    f.texte(560, 462, "static int n", MONO_GRAS)
    f.d.rectangle([840, 456, 950, 500], outline=NOIR, width=2, fill="white")
    f.texte(895, 462, "0", MONO, centre=True)
    f.texte(30, 470, "b1.n, b2.n", MONO, GRIS)
    f.texte(30, 505, "et B.n", MONO, GRIS)
    f.texte(1010, 470, "même case", TEXTE_IT, GRIS)
    f.enregistrer("poo-champ-classe.png")


def poo_sans_this():
    f = Figure(1500, 460)
    for k, nom in enumerate(("c1", "c2", "c3")):
        f.objet(60 + k * 470, 40, f"C {nom}", [("int n", "0")], 330)
    f.d.rounded_rectangle([520, 270, 960, 340], radius=12, outline=NOIR, width=3, fill="white")
    f.texte(740, 285, "C.fixer();", MONO_GRAS, centre=True)
    for k in range(3):
        f.fleche((740, 270), (225 + k * 470, 152), GRIS, pointillee=True)
    f.bulle(560, 380, "n = 2 : oui, mais lequel ?")
    f.enregistrer("poo-sans-this.png")


def poo_primitif_reference():
    f = Figure(1500, 420)
    c = f.variable(60, 30, "int hauteur", "200", 300)
    f.texte(210, 160, "la valeur est dans la variable", TEXTE_IT, GRIS, centre=True)
    c = f.variable(780, 30, "Etudiant alex", None, 300)
    o = f.objet(1080, 200, "un objet Etudiant", [("nom", "\"Alex\"")], 390)
    f.fleche((c[0], c[1]), (o[0] + 60, o[1]))
    f.texte(930, 160, "la variable contient", TEXTE_IT, GRIS, centre=True)
    f.texte(930, 195, "une référence", TEXTE_IT, GRIS, centre=True)
    f.enregistrer("poo-primitif-reference.png")


def poo_deux_noms():
    f = Figure(1500, 400)
    f.texte(30, 10, "Livre l2 = l1;", MONO)
    c1 = f.variable(80, 80, "Livre l1", None, 220)
    c2 = f.variable(80, 230, "Livre l2", None, 220)
    o = f.objet(760, 120, "un seul objet Livre", [("titre", "\"Dune\""), ("anneeDeParution", "1966")], 620)
    f.fleche((c1[0], c1[1]), (o[0], o[1] + 60))
    f.fleche((c2[0], c2[1]), (o[0], o[1] + 150))
    f.enregistrer("poo-deux-noms.png")


# ---------------------------------------------------------------------------
#  Modules TAB et ENU
# ---------------------------------------------------------------------------

def tab_tableau_de_tableaux():
    f = Figure(1500, 640)
    f.texte(70, 10, "tab", MONO_GRAS)
    f.texte(420, 10, "tab[i] : un int[] à part entière", TEXTE_IT, GRIS)
    lignes = [("[0]", 3), ("[1]", 5), ("[2]", 6), ("⋮", None), ("[n-1]", 2), ("[n]", 5)]
    y = 70
    for nom, n in lignes:
        if n is None:
            for k in range(3):      # trois points verticaux, dessines
                f.d.ellipse([105, y + 10 + 16 * k, 115, y + 20 + 16 * k], fill=GRIS)
            f.texte(600, y + 4, "…", MONO, GRIS, centre=True)
        else:
            f.d.rectangle([40, y, 180, y + 60], outline=NOIR, width=3, fill=FOND)
            f.texte(110, y + 12, nom, MONO, centre=True)
            f.fleche((180, y + 30), (400, y + 30))
            for k in range(n):
                x = 410 + k * 120
                gras = (nom == "[2]" and k == 4)
                f.d.rectangle([x, y, x + 120, y + 60], outline=NOIR, width=5 if gras else 2,
                              fill=GRIS_CLAIR if gras else "white")
                f.texte(x + 60, y + 12, f"[{k}]", MONO_GRAS if gras else MONO, centre=True)
        y += 90
    f.texte(1180, 260, "tab[2][4]", MONO_GRAS)
    f.enregistrer("tab-tableau-de-tableaux.png")


def classe_uml(f, x, y, nom, largeur=240, sous=None):
    f.d.rectangle([x, y, x + largeur, y + 70], outline=NOIR, width=3, fill=FOND)
    f.texte(x + largeur / 2, y + 16, nom, MONO_GRAS, centre=True)
    if sous:
        f.texte(x + largeur / 2, y + 84, sous, TEXTE_IT, GRIS, centre=True)
    return (x, y, x + largeur, y + 70)


def lien(f, a, b, multiplicite):
    """Une association de a vers b, avec sa multiplicite pres de b."""
    y = (a[1] + a[3]) / 2
    f.fleche((a[2], y), (b[0] - 4, y))
    f.texte(b[0] - 50, y - 44, multiplicite, MONO, GRIS)


def tab_classes_vente():
    f = Figure(1600, 230)
    person = classe_uml(f, 20, 60, "Person")
    vendor = classe_uml(f, 440, 60, "Vendor")
    sale = classe_uml(f, 860, 60, "Sale")
    car = classe_uml(f, 1280, 60, "Car", 280)
    # Vendor connait une Person (fleche vers la gauche)
    yv = 95
    f.fleche((vendor[0], yv), (person[2] + 4, yv))
    f.texte(person[2] + 16, yv - 44, "1", MONO, GRIS)
    lien(f, vendor, sale, "*")
    lien(f, sale, car, "1")
    f.texte(800, 175, "un vendeur a une personne, des ventes ; une vente porte sur une voiture", TEXTE_IT, GRIS, centre=True)
    f.enregistrer("tab-classes-vente.png")


def enu_modele_jeu():
    f = Figure(1500, 400)
    deck = classe_uml(f, 20, 150, "Deck")
    card = classe_uml(f, 470, 150, "Card")
    color = classe_uml(f, 960, 40, "Color", 260, "PIQUE, COEUR, CARREAU, TREFLE")
    value = classe_uml(f, 960, 250, "Value", 260, "AS, DEUX, …, DAME, ROI")
    lien(f, deck, card, "*")
    f.fleche((card[2], 170), (color[0] - 4, 90))
    f.texte(color[0] - 60, 70, "1", MONO, GRIS)
    f.fleche((card[2], 200), (value[0] - 4, 285))
    f.texte(value[0] - 60, 300, "1", MONO, GRIS)
    f.texte(1240, 60, "enum", TEXTE_IT, GRIS)
    f.texte(1240, 270, "enum", TEXTE_IT, GRIS)
    f.enregistrer("enu-modele-jeu.png")


# ---------------------------------------------------------------------------
#  Modules ABS et ITF
# ---------------------------------------------------------------------------

def boite_classe(f, x, y, nom, genre=None, lignes=(), largeur=300):
    """Une classe : son nom (en italique si abstraite), son genre en petit
    au-dessus (« abstraite », « interface »), et quelques lignes dessous."""
    h = 64 + 40 * len(lignes) + (8 if lignes else 0)
    f.d.rectangle([x, y, x + largeur, y + h], outline=NOIR, width=3,
                  fill=GRIS_CLAIR if genre == "interface" else (FOND if genre else "white"))
    if genre:
        f.texte(x + largeur / 2, y + 4, "«" + genre + "»", TEXTE_IT, GRIS, centre=True)
    police = ImageFont.truetype(POLICES + "DejaVuSansMono-BoldOblique.ttf", 30) if genre == "abstraite" else MONO_GRAS
    f.texte(x + largeur / 2, y + (30 if genre else 14), nom, police, centre=True)
    if lignes:
        f.d.line([x, y + 70, x + largeur, y + 70], fill=NOIR, width=2)
        for k, l in enumerate(lignes):
            f.texte(x + 14, y + 78 + 40 * k, l, MONO)
    return (x, y, x + largeur, y + h)


def herite(f, fille, mere, pointille=False):
    """Une fleche d'heritage : de la fille vers la mere, pointe ouverte."""
    import math
    xa, ya = (fille[0] + fille[2]) / 2, fille[1]
    xb, yb = (mere[0] + mere[2]) / 2, mere[3]
    # trajet en equerre : monter, traverser, monter
    ym = (ya + yb) / 2
    segs = [((xa, ya), (xa, ym)), ((xa, ym), (xb, ym)), ((xb, ym), (xb, yb + 22))]
    for a, b in segs:
        if pointille:
            n = max(2, int(abs(a[0] - b[0]) + abs(a[1] - b[1])) // 18)
            for k in range(0, n, 2):
                f.d.line([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n,
                          a[0] + (b[0] - a[0]) * (k + 1) / n, a[1] + (b[1] - a[1]) * (k + 1) / n], fill=NOIR, width=3)
        else:
            f.d.line([a, b], fill=NOIR, width=3)
    f.d.polygon([(xb, yb), (xb - 16, yb + 24), (xb + 16, yb + 24)], outline=NOIR, fill="white", width=3)


def abs_prestations():
    f = Figure(1600, 760)
    fac = boite_classe(f, 600, 20, "Facturable", "interface", ["double montant()"], 400)
    pre = boite_classe(f, 600, 220, "Prestation", "abstraite", ["client, facture()"], 400)
    forf = boite_classe(f, 180, 430, "Forfait", "abstraite", ["prixForfait"], 360)
    hor = boite_classe(f, 1060, 430, "Horaire", "abstraite", ["tauxHoraire, heures"], 400)
    feuilles = [boite_classe(f, 40, 640, "Abonnement", None, (), 300),
                boite_classe(f, 380, 640, "Installation", None, (), 300),
                boite_classe(f, 960, 640, "Depannage", None, (), 280),
                boite_classe(f, 1280, 640, "Urgence", None, (), 280)]
    herite(f, pre, fac, pointille=True)
    herite(f, forf, pre); herite(f, hor, pre)
    herite(f, feuilles[0], forf); herite(f, feuilles[1], forf)
    herite(f, feuilles[2], hor); herite(f, feuilles[3], hor)
    f.enregistrer("abs-prestations.png")


def abs_visualiseur():
    f = Figure(1600, 620)
    mere = boite_classe(f, 380, 20, "VisualiseurDeDonneesBancaires", "abstraite",
                        ["total()              écrite une fois",
                         "rapport()            écrite une fois",
                         "donneesBrutes()      abstraite",
                         "nomDeLaBanque()      abstraite",
                         "versMouvement(ligne) abstraite"], 840)
    fric = boite_classe(f, 120, 470, "VisualiseurFricEnVrac", None, (), 520)
    pep = boite_classe(f, 960, 470, "VisualiseurBanquierPepere", None, (), 560)
    herite(f, fric, mere); herite(f, pep, mere)
    f.texte(380, 560, "existe déjà : le modèle", TEXTE_IT, GRIS, centre=True)
    f.texte(1240, 560, "à écrire : ABS.3", TEXTE_IT, GRIS, centre=True)
    f.enregistrer("abs-visualiseur.png")


# Les cinq formes de collection, d'apres les illustrations des anciens
# slides de Frederic (21/10/2026), en niveaux de gris : une teinte = une
# valeur ; deux disques de meme teinte sont deux fois la meme valeur.
TEINTES = {"a": (90, 90, 90), "b": (150, 150, 150), "c": (200, 200, 200), "d": (120, 120, 120), "e": (235, 235, 235)}


def disque(f, x, y, teinte, r=34):
    f.d.ellipse([x - r, y - r, x + r, y + r], fill=TEINTES[teinte], outline=NOIR, width=3)


def col_forme(nom):
    f = Figure(760, 300)
    if nom == "collection":
        f.d.rounded_rectangle([170, 40, 590, 260], radius=40, outline=NOIR, width=4, fill=FOND)
        for x, y, t in ((250, 100, "a"), (360, 95, "b"), (490, 110, "c"), (280, 200, "b"), (420, 195, "d")):
            disque(f, x, y, t)
    elif nom == "list":
        f.d.rounded_rectangle([40, 70, 720, 190], radius=30, outline=NOIR, width=4, fill=FOND)
        for k, t in enumerate("abcad"):
            x = 110 + k * 135
            disque(f, x, 130, t)
            f.texte(x, 210, str(k), MONO_GRAS, centre=True)
    elif nom == "set":
        f.d.ellipse([60, 50, 700, 250], outline=NOIR, width=4, fill=FOND)
        for x, y, t in ((180, 160, "a"), (290, 100, "b"), (380, 180, "c"), (480, 110, "d"), (580, 165, "e")):
            disque(f, x, y, t)
    elif nom == "map":
        f.d.rounded_rectangle([40, 20, 720, 280], radius=30, outline=NOIR, width=4, fill=FOND)
        for k, t in enumerate("abcde"):
            x = 110 + k * 135
            disque(f, x, 80, t, 30)
            f.d.line([x, 110, x, 170], fill=NOIR, width=3)
            f.d.rectangle([x - 32, 170, x + 32, 234], fill=TEINTES["abcad"[k]], outline=NOIR, width=3)
        f.texte(30, 0, "", TEXTE)
    elif nom == "deque":
        f.d.rounded_rectangle([150, 70, 610, 190], radius=30, outline=NOIR, width=4, fill=FOND)
        for k, t in enumerate("abcd"):
            disque(f, 230 + k * 100, 130, t)
        disque(f, 60, 130, "e", 30)
        disque(f, 700, 130, "c", 30)
        f.fleche((95, 130), (145, 130))
        f.fleche((665, 130), (615, 130))
        f.texte(380, 220, "ajouts et retraits aux deux bouts", TEXTE_IT, GRIS, centre=True)
    f.enregistrer(f"col-{nom}.png")


def col_formes():
    for nom in ("collection", "list", "set", "map", "deque"):
        col_forme(nom)


def fic_racines():
    f = Figure(2000, 560)
    groupes = [("octets", 30, [("InputStream", ["FileInputStream", "BufferedInputStream", "ObjectInputStream"]),
                               ("OutputStream", ["FileOutputStream", "DataOutputStream", "ObjectOutputStream"])]),
               ("caractères", 1060, [("Reader", ["FileReader", "BufferedReader"]),
                                    ("Writer", ["FileWriter", "PrintWriter"])])]
    for famille, x0, racines in groupes:
        f.texte(x0 + 450, 10, "flux de " + famille, TEXTE_IT, GRIS, centre=True)
        for k, (racine, filles) in enumerate(racines):
            xr = x0 + k * 470
            r = boite_classe(f, xr + 30, 60, racine, "abstraite", (), 420)
            for j, fille in enumerate(filles):
                b = boite_classe(f, xr + 60, 210 + j * 100, fille, None, (), 390)
                # un trait d'heritage, en peigne : vertical a gauche, puis vers la fille
                f.d.line([xr + 40, r[3], xr + 40, b[1] + 35], fill=NOIR, width=3)
                f.d.line([xr + 40, b[1] + 35, b[0], b[1] + 35], fill=NOIR, width=3)
            f.d.polygon([(xr + 40, r[3]), (xr + 26, r[3] + 22), (xr + 54, r[3] + 22)], outline=NOIR, fill="white", width=3)
    f.texte(1000, 530, "chaque classe de flux descend, directement ou non, de l'une des quatre classes abstraites", TEXTE_IT, GRIS, centre=True)
    f.enregistrer("fic-racines.png")


def fic_emboitement():
    f = Figure(1600, 470)
    couches = [("DataOutputStream", "traduit un int en octets"),
               ("BufferedOutputStream", "regroupe les octets"),
               ("FileOutputStream", "écrit dans le fichier")]
    for k, (nom, role) in enumerate(couches):
        x0, y0 = 60 + k * 80, 20 + k * 100
        f.d.rounded_rectangle([x0, y0, 1540 - k * 80, 420], radius=18, outline=NOIR, width=3,
                              fill=FOND if k % 2 == 0 else GRIS_CLAIR)
        f.texte(x0 + 24, y0 + 12, nom, MONO_GRAS)
        f.texte(x0 + 24, y0 + 50, role, TEXTE_IT, GRIS)
    f.texte(800, 430, "on ne parle qu'à la couche extérieure ; les octets descendent jusqu'au disque", TEXTE_IT, GRIS, centre=True)
    f.enregistrer("fic-emboitement.png")


def fx_graphe():
    f = Figure(1500, 520)
    st = boite_classe(f, 560, 20, "Stage", None, (), 380)
    sc = boite_classe(f, 560, 140, "Scene", None, (), 380)
    vb = boite_classe(f, 560, 260, "VBox", None, (), 380)
    lb = boite_classe(f, 300, 400, "Label", None, (), 300)
    bt = boite_classe(f, 900, 400, "Button", None, (), 300)
    for haut, bas in ((st, sc), (sc, vb)):
        f.d.line([(haut[0] + haut[2]) / 2, haut[3], (bas[0] + bas[2]) / 2, bas[1]], fill=NOIR, width=3)
    for enf in (lb, bt):
        f.d.line([(vb[0] + vb[2]) / 2, vb[3], (enf[0] + enf[2]) / 2, enf[1]], fill=NOIR, width=3)
    f.texte(1000, 40, "la fenêtre, fournie par JavaFX", TEXTE_IT, GRIS)
    f.texte(1000, 160, "la scène : une seule racine", TEXTE_IT, GRIS)
    f.texte(1000, 280, "la racine, un conteneur", TEXTE_IT, GRIS)
    f.texte(750, 480, "les nœuds qu'on voit", TEXTE_IT, GRIS, centre=True)
    f.enregistrer("fx-graphe.png")


def fx_propagation():
    f = Figure(1500, 560)
    noms = ["Stage", "Scene", "BorderPane", "Pane", "Circle"]
    for k, n in enumerate(noms):
        y = 30 + k * 100
        f.d.rectangle([520, y, 980, y + 70], outline=NOIR, width=3, fill=GRIS_CLAIR if n == "Circle" else FOND)
        f.texte(750, y + 18, n, MONO_GRAS, centre=True)
    f.fleche((440, 50), (440, 470))
    f.texte(300, 230, "capture", TEXTE_IT, GRIS, centre=True)
    f.texte(300, 265, "(filtres)", TEXTE_IT, GRIS, centre=True)
    f.fleche((1060, 470), (1060, 50))
    f.texte(1230, 230, "bouillonnement", TEXTE_IT, GRIS, centre=True)
    f.texte(1230, 265, "(gestionnaires)", TEXTE_IT, GRIS, centre=True)
    f.texte(750, 520, "la cible : le nœud cliqué", TEXTE_IT, GRIS, centre=True)
    f.enregistrer("fx-propagation.png")


def gen_bagages():
    f = Figure(1500, 420)
    bag = boite_classe(f, 560, 20, "Bagage", None, ["getPoids()"], 380)
    val = boite_classe(f, 260, 250, "Valise", None, (), 340)
    sac = boite_classe(f, 900, 250, "Sac", None, (), 340)
    herite(f, val, bag); herite(f, sac, bag)
    f.texte(750, 370, "une Valise est un Bagage ; une List<Valise> n'est pas une List<Bagage>", TEXTE_IT, GRIS, centre=True)
    f.enregistrer("gen-bagages.png")


def exc_hierarchie():
    f = Figure(1500, 470)
    thr = boite_classe(f, 560, 20, "Throwable", None, (), 380)
    err = boite_classe(f, 120, 180, "Error", None, (), 300)
    exc = boite_classe(f, 900, 180, "Exception", None, (), 340)
    rte = boite_classe(f, 900, 340, "RuntimeException", None, (), 420)
    herite(f, err, thr); herite(f, exc, thr); herite(f, rte, exc)
    f.texte(270, 270, "ne s'attrape pas", TEXTE_IT, GRIS, centre=True)
    f.texte(1265, 200, "contrôlées", TEXTE_IT, GRIS)
    f.texte(1335, 360, "non", TEXTE_IT, GRIS)
    f.texte(1335, 395, "contrôlées", TEXTE_IT, GRIS)
    f.enregistrer("exc-hierarchie.png")


def exc_pile():
    f = Figure(1600, 640)
    cadres = [("verifier(12)", "throw new IllegalArgumentException(...)", "s'arrête net"),
              ("monter(12)", "deplacer(12);   // jamais exécuté", "abandonnée à son tour"),
              ("main()", "try { ... } catch (IllegalArgumentException e)", "le catch la traite ici")]
    for k, (nom, code, effet) in enumerate(cadres):
        y = 40 + k * 180
        f.d.rectangle([260, y, 1140, y + 130], outline=NOIR, width=3, fill=FOND if k else GRIS_CLAIR)
        f.texte(290, y + 14, nom, MONO_GRAS)
        f.texte(290, y + 70, code, MONO)
        f.texte(1170, y + 46, effet, TEXTE_IT, GRIS)
    # les appels montent (a gauche), l'exception descend (a droite du cadre)
    f.fleche((180, 520), (180, 60))
    f.texte(150, 270, "appels", TEXTE_IT, GRIS, centre=True)
    for k in range(2):
        f.fleche((1080, 170 + k * 180), (1080, 220 + k * 180))
    f.texte(700, 590, "l'exception descend la pile jusqu'au premier catch qui lui convient", TEXTE_IT, GRIS, centre=True)
    f.enregistrer("exc-pile.png")


def col_interfaces():
    f = Figure(1800, 560)
    col = boite_classe(f, 420, 20, "Collection<E>", "interface", (), 340)
    mp = boite_classe(f, 1380, 20, "Map<K, V>", "interface", (), 340)
    filles = []
    for k, n in enumerate(("List<E>", "Set<E>", "Deque<E>")):
        b = boite_classe(f, 40 + k * 420, 230, n, "interface", (), 300)
        herite(f, b, col)
        filles.append(b)
    f.texte(1100, 110, "clés et valeurs :", TEXTE_IT, GRIS)
    f.texte(1100, 145, "pas une Collection", TEXTE_IT, GRIS)
    classes = [(0, "ArrayList", 0), (0, "LinkedList", 200), (1, "HashSet", 420), (1, "TreeSet", 620),
               (2, "ArrayDeque", 860), (None, "HashMap", 1300), (None, "TreeMap", 1520)]
    for parent, nom, x in classes:
        b = boite_classe(f, x + 10, 440, nom, None, (), 190 if nom != "ArrayDeque" else 210)
        herite(f, b, filles[parent] if parent is not None else mp, pointille=True)
    f.texte(900, 525, "trait plein : hérite de l'interface ; pointillé : la classe l'implémente", TEXTE_IT, GRIS, centre=True)
    f.enregistrer("col-interfaces.png")


def abs_notifications():
    f = Figure(1720, 560)
    mere = boite_classe(f, 550, 20, "Notification", "abstraite",
                        ["destinataire",
                         "envoyer(texte)   écrite une fois",
                         "canal()          abstraite"], 620)
    noms = [("NotificationMail", "canal() : mail"), ("NotificationSms", "canal() : sms"),
            ("NotificationPush", "canal() : push"), ("NotificationWhatsApp", "canal() : whatsapp")]
    for k, (n, c) in enumerate(noms):
        b = boite_classe(f, 20 + k * 425, 360, n, None, [c], 400)
        herite(f, b, mere)
        if k == 3:
            # le canal ajoute plus tard : un cadre pointille, pour dire
            # qu'il s'ajoute sans rien modifier d'autre
            for x0, y0, x1, y1 in ((b[0] - 10, b[1] - 10, b[2] + 10, b[1] - 10), (b[0] - 10, b[3] + 10, b[2] + 10, b[3] + 10),
                                   (b[0] - 10, b[1] - 10, b[0] - 10, b[3] + 10), (b[2] + 10, b[1] - 10, b[2] + 10, b[3] + 10)):
                n_ = max(2, int(abs(x1 - x0) + abs(y1 - y0)) // 16)
                for j in range(0, n_, 2):
                    f.d.line([x0 + (x1 - x0) * j / n_, y0 + (y1 - y0) * j / n_,
                              x0 + (x1 - x0) * (j + 1) / n_, y0 + (y1 - y0) * (j + 1) / n_], fill=GRIS, width=2)
            f.texte((b[0] + b[2]) / 2, b[3] + 24, "un canal de plus : une classe", TEXTE_IT, GRIS, centre=True)
    f.enregistrer("abs-notifications.png")


def itf_mvc():
    f = Figure(1600, 340)
    def boite(x, titre, sous, desc):
        f.d.rounded_rectangle([x, 80, x + 320, 250], radius=16, outline=NOIR, width=3, fill=FOND)
        f.texte(x + 160, 96, titre, MONO_GRAS, centre=True)
        f.texte(x + 160, 140, sous, MONO, GRIS, centre=True)
        f.texte(x + 160, 190, desc, TEXTE_IT, GRIS, centre=True)
    f.texte(100, 150, "Utilisateur", TEXTE, centre=True)
    boite(290, "Vue", "GUI", "affiche, capte")
    boite(790, "Contrôleur", "Controleur", "reçoit, décide")
    boite(1260, "Modèle", "", "données et règles")
    f.fleche((190, 200), (282, 200)); f.texte(236, 210, "clic", TEXTE_IT, GRIS, centre=True)
    f.fleche((612, 130), (782, 130)); f.texte(697, 86, "action", TEXTE_IT, GRIS, centre=True)
    f.fleche((782, 210), (612, 210)); f.texte(697, 262, "affiche(message)", TEXTE_IT, GRIS, centre=True)
    f.fleche((1112, 165), (1252, 165)); f.texte(1182, 112, "met à jour", TEXTE_IT, GRIS, centre=True)
    f.enregistrer("itf-mvc.png")


def itf_transports():
    f = Figure(1600, 700)
    tr = boite_classe(f, 620, 20, "Transport", "abstraite", ["bouge()"], 360)
    noms = [("Voiture", "roule"), ("Avion", "vole"), ("Moto", "se faufile"), ("Velo", "pédale")]
    feuilles = []
    for k, (n, v) in enumerate(noms):
        b = boite_classe(f, 60 + k * 390, 300, n, None, [v], 300)
        feuilles.append(b)
        herite(f, b, tr)
    mot = boite_classe(f, 420, 560, "Motorise", "interface", ["faisLePlein()"], 380)
    for b in feuilles[:3]:
        # implements Motorise : trait pointille, de la classe vers l'interface
        xa, ya = (b[0] + b[2]) / 2, b[3]
        xb, yb = (mot[0] + mot[2]) / 2, mot[1]
        n = 24
        for k in range(0, n, 2):
            f.d.line([xa + (xb - xa) * k / n, ya + (yb - ya) * k / n,
                      xa + (xb - xa) * (k + 1) / n, ya + (yb - ya) * (k + 1) / n], fill=NOIR, width=3)
        f.d.polygon([(xb, yb), (xb - 14, yb - 22), (xb + 14, yb - 22)], outline=NOIR, fill="white", width=3)
    f.texte(1325, 470, "le vélo n'implémente pas", TEXTE_IT, GRIS, centre=True)
    f.texte(1325, 505, "Motorise", TEXTE_IT, GRIS, centre=True)
    f.enregistrer("itf-transports.png")


if __name__ == "__main__":
    for fn in (fic_racines, fic_emboitement, fx_graphe, fx_propagation, gen_bagages, exc_hierarchie, exc_pile, col_formes, col_interfaces, abs_notifications, abs_prestations, abs_visualiseur, itf_mvc, itf_transports):
        fn()
    for fn in (tab_tableau_de_tableaux, tab_classes_vente, enu_modele_jeu):
        fn()
    for fn in (poo_compilation, poo_champs_objet, poo_champ_classe, poo_sans_this,
               poo_primitif_reference, poo_deux_noms):
        fn()
