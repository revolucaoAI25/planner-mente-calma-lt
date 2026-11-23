"""Imposição das páginas A5 em folhas A4 deitadas (2 por folha).

cortar: "cortar e empilhar". Imprima frente e verso, corte todas as folhas ao meio de uma vez,
        coloque a pilha da direita embaixo da pilha da esquerda: as páginas ficam na ordem.
refil : cada par (A, B) vira uma folha com A|A na frente e B|B no verso (2 cópias por folha).

O verso é montado para impressão frente e verso virando pela BORDA CURTA (padrão para PDFs deitados).
"""
import sys
from pypdf import PdfReader, PdfWriter, PageObject, Transformation

W, H = 841.89, 595.28  # A4 deitada (pt)


def folha(marcas, esq, dir_):
    s = PageObject.create_blank_page(width=W, height=H)
    s.merge_page(marcas)
    for pg, x in ((esq, W / 2 - float(esq.mediabox.width) if esq else 0), (dir_, W / 2)):
        if pg is None:
            continue
        y = (H - float(pg.mediabox.height)) / 2
        s.merge_transformed_page(pg, Transformation().translate(tx=x, ty=y))
    return s


def cortar(src, marcas_pdf, out):
    r = PdfReader(src)
    m = PdfReader(marcas_pdf).pages[0]
    pags = list(r.pages)
    if len(pags) % 2:
        pags.append(None)
    folhas_a5 = [(pags[i], pags[i + 1]) for i in range(0, len(pags), 2)]
    S = (len(folhas_a5) + 1) // 2
    w = PdfWriter()
    for s in range(S):
        e = folhas_a5[s]
        d = folhas_a5[s + S] if s + S < len(folhas_a5) else (None, None)
        w.add_page(folha(m, e[0], d[0]))  # frente
        w.add_page(folha(m, d[1], e[1]))  # verso (virando pela borda curta)
    meta(w, r)
    w.write(out)


def refil(src, marcas_pdf, out):
    r = PdfReader(src)
    m = PdfReader(marcas_pdf).pages[0]
    p = list(r.pages)
    w = PdfWriter()
    for i in range(0, len(p), 2):
        w.add_page(folha(m, p[i], p[i]))
        w.add_page(folha(m, p[i + 1], p[i + 1]))
    meta(w, r)
    w.write(out)


def meta(w, r):
    w.add_metadata({'/Title': (r.metadata or {}).get('/Title', 'Planner Mente Calma'), '/Author': 'Planner Mente Calma'})
    w.compress_identical_objects(remove_identicals=True, remove_orphans=True)


if __name__ == '__main__':
    modo, *args = sys.argv[1:]
    {'cortar': cortar, 'refil': refil}[modo](*args)
