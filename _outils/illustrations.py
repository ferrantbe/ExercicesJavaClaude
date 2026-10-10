#!/usr/bin/env python3
"""
illustrations.py — une image par theme, dessinee en code.

    python3 _outils/illustrations.py            tout
    python3 _outils/illustrations.py ABS ENU    seulement celles-la

Sortie : un SVG et un PNG par theme, dans _illustrations/.

POURQUOI DESSINER PLUTOT QUE CHERCHER UNE IMAGE
------------------------------------------------
Trois raisons, dans l'ordre d'importance.

Les quinze images partagent alors la meme palette, la meme epaisseur de
trait et le meme niveau d'abstraction. Une collection d'images trouvees
ici et la ne s'accorde jamais, et cela se voit sur un projecteur.

Le SVG se redimensionne sans perte : la meme image sert en vignette dans
un fascicule et en plein ecran sur une slide.

Et rien n'appartient a personne d'autre.

LE PARTI PRIS GRAPHIQUE
-----------------------
Aplats, pas de degrade ni d'ombre. Un trait sombre constant. Une couleur
d'accent par theme, prise dans une palette commune, pour que les quinze
se reconnaissent comme une famille tout en se distinguant d'un coup
d'oeil.

Le dessin reste ABSTRAIT : on suggere un tampon dateur, on ne le
represente pas fidelement. A la taille ou ces images seront vues, le
detail se perd et ne fait qu'encombrer.
"""

import sys
from pathlib import Path

import numpy as np

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import (Circle, FancyBboxPatch, Polygon, Rectangle,
                                Wedge)

SORTIE = Path(__file__).resolve().parent.parent / "_illustrations"

# La palette commune. TRAIT ne change jamais ; ACCENT varie par theme.
TRAIT = "#1F3A5F"
PAPIER = "#FFFFFF"
GRIS = "#D9DEE5"
GRIS_SOMBRE = "#A8B2C0"

ACCENTS = {
    "ABS": "#C75B39",   # terre cuite
    "ENU": "#B23A48",   # rouge carte
    "EXC": "#E0A81C",   # jaune eclair
}

EPAIS = 2.6


def figure():
    fig, ax = plt.subplots(figsize=(4, 3), dpi=200)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 75)
    ax.set_aspect("equal")
    ax.axis("off")
    fig.patch.set_alpha(0)
    return fig, ax


def boite(ax, x, y, l, h, couleur, rayon=2, trait=TRAIT, epais=EPAIS, z=2):
    ax.add_patch(FancyBboxPatch(
        (x, y), l, h, boxstyle=f"round,pad=0,rounding_size={rayon}",
        facecolor=couleur, edgecolor=trait, linewidth=epais, zorder=z))


def enregistrer(fig, nom):
    SORTIE.mkdir(exist_ok=True)
    for extension in ("svg", "png"):
        fig.savefig(SORTIE / f"{nom}.{extension}", format=extension,
                    transparent=True, bbox_inches="tight", pad_inches=0.15)
    plt.close(fig)
    print(f"   {nom}.svg  et  {nom}.png")


# =====================================================================
#  ABS — un tampon dateur
#
#  L'idee : un meme tampon, des dates differentes. La forme est fixe, le
#  contenu change — c'est exactement ce que fait une classe abstraite.
# =====================================================================

def abs_():
    fig, ax = figure()
    a = ACCENTS["ABS"]

    # la poignee : un bouton arrondi sur une tige
    ax.add_patch(Circle((50, 64), 8, facecolor=a, edgecolor=TRAIT,
                        linewidth=EPAIS, zorder=4))
    ax.add_patch(Rectangle((47, 50), 6, 12, facecolor=a, edgecolor=TRAIT,
                           linewidth=EPAIS, zorder=3))
    boite(ax, 34, 44, 32, 8, a, rayon=3, z=4)

    # les molettes : trois bandes, le reglage variable
    for i, x in enumerate((40, 50, 60)):
        boite(ax, x - 4, 34, 8, 11, PAPIER, rayon=1, z=4)
        for j in range(3):
            ax.plot([x - 4, x + 4], [37 + j * 3, 37 + j * 3],
                    color=GRIS_SOMBRE, linewidth=1.2, zorder=5)

    # le socle
    boite(ax, 30, 26, 40, 8, GRIS, rayon=2, z=3)

    # l'empreinte laissee sur le papier
    boite(ax, 18, 6, 64, 18, PAPIER, rayon=2, z=1)
    for i, y in enumerate((16, 11)):
        ax.plot([26, 74 - i * 18], [y, y], color=GRIS_SOMBRE,
                linewidth=2.4, zorder=2, solid_capstyle="round")

    enregistrer(fig, "ABS")


# =====================================================================
#  ENU — trois cartes a jouer
#
#  Un jeu ferme : les valeurs existent en nombre fini et connu d'avance.
#  Trois cartes suffisent a le dire ; en dessiner cinquante-deux
#  n'ajouterait rien.
# =====================================================================

def enu():
    fig, ax = figure()
    a = ACCENTS["ENU"]

    # Trois cartes en eventail. L'ordre de dessin compte : la derniere
    # tracee passe devant, et c'est elle qui portera le symbole.
    for i, (x, angle) in enumerate(((26, -18), (37, 0), (48, 18))):
        carte = FancyBboxPatch(
            (x, 18), 24, 38,
            boxstyle="round,pad=0,rounding_size=3",
            facecolor=PAPIER, edgecolor=TRAIT, linewidth=EPAIS, zorder=10 + i * 10)
        carte.set_transform(
            matplotlib.transforms.Affine2D().rotate_deg_around(x + 12, 24, angle)
            + ax.transData)
        ax.add_patch(carte)

    # Le coeur, sur la carte de droite : deux lobes et une pointe.
    cx, cy, r = 64, 44, 3.4
    ax.add_patch(Circle((cx - r * 0.85, cy), r, facecolor=a, edgecolor="none", zorder=40))
    ax.add_patch(Circle((cx + r * 0.85, cy), r, facecolor=a, edgecolor="none", zorder=40))
    ax.add_patch(Polygon([(cx - r * 1.75, cy - 0.6), (cx + r * 1.75, cy - 0.6),
                          (cx, cy - r * 2.6)],
                         facecolor=a, edgecolor="none", zorder=40))

    enregistrer(fig, "ENU")


# =====================================================================
#  EXC — un eclair traversant un nuage
#
#  L'exception vient d'ailleurs et interrompt le cours normal. L'eclair
#  sort du nuage et descend : le mouvement se lit sans legende.
# =====================================================================

def exc():
    fig, ax = figure()
    a = ACCENTS["EXC"]

    # LE NUAGE EN UN SEUL CONTOUR.
    #
    # Empiler des cercles bordes laisse voir les traits interieurs, et
    # l'on obtient une grappe plutot qu'un nuage. On calcule donc la
    # SILHOUETTE : pour chaque abscisse, le point le plus haut parmi les
    # cercles, puis on ferme par la base. Un seul polygone, un seul trait.
    bosses = ((37, 48, 11), (50, 53, 13.5), (63, 48, 11))
    base = 40.0
    xs = np.linspace(26.0, 74.0, 400)
    hauts = []
    for x in xs:
        y = base
        for cx, cy, r in bosses:
            dx = abs(x - cx)
            if dx < r:
                y = max(y, cy + (r * r - dx * dx) ** 0.5)
        hauts.append(y)

    contour = list(zip(xs, hauts)) + [(74.0, base), (26.0, base)]
    ax.add_patch(Polygon(contour, closed=True, facecolor=GRIS,
                         edgecolor=TRAIT, linewidth=EPAIS, zorder=3,
                         joinstyle="round"))

    # L'eclair part SOUS le nuage : il ne doit pas le chevaucher, sans
    # quoi on ne sait plus lequel passe devant l'autre.
    ax.add_patch(Polygon(
        [(53, 38), (41, 19), (49, 19), (43, 3), (61, 25), (52, 25)],
        facecolor=a, edgecolor=TRAIT, linewidth=EPAIS, zorder=5,
        joinstyle="miter"))

    enregistrer(fig, "EXC")


# =====================================================================

TOUT = {"ABS": abs_, "ENU": enu, "EXC": exc}


def main():
    demandes = [a.upper() for a in sys.argv[1:] if not a.startswith("--")]
    themes = demandes or list(TOUT)

    print(f"Sortie : {SORTIE}\n")
    for nom in themes:
        if nom not in TOUT:
            print(f"   {nom} : pas encore dessine")
            continue
        TOUT[nom]()


if __name__ == "__main__":
    main()
