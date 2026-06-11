#!/usr/bin/env python3
"""Gera capas LinkedIn Kokoro — página da empresa (4200×700 px, 6:1)."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

# LinkedIn Company Page — https://www.linkedin.com/help/linkedin/answer/a563309
W, H = 4200, 700

CORAL = (245, 113, 112)
CORAL_MID = (232, 95, 95)
CORAL_DARK = (217, 79, 79)

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
ASSETS = Path.home() / ".cursor/projects/Users-thiagokeller-Dev-Kokoro-institucional/assets"
FONT_DIR = Path("/tmp/kokoro-fonts")
LOGO_SRC = PUBLIC / "Logo_2C-transparent.png"
GEMINI = ASSETS / "Gemini_Generated_Image_vo9n0evo9n0evo9n-eb6f27e0-9a7a-4c95-8456-0c707e4f7d40.png"

# Canto inferior esquerdo: logo circular da página sobrepõe a capa
OVERLAP_RIGHT = 920
OVERLAP_TOP = int(H * 0.52)


def lerp(a: tuple[int, int, int], b: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def dm_sans(size: int, weight: str = "Regular") -> ImageFont.FreeTypeFont:
    font = ImageFont.truetype(str(FONT_DIR / "DMSans.ttf"), size)
    font.set_variation_by_name(weight)
    return font


def dm_serif(size: int, italic: bool = False) -> ImageFont.FreeTypeFont:
    name = "DMSerifDisplay-Italic.ttf" if italic else "DMSerifDisplay-Regular.ttf"
    return ImageFont.truetype(str(FONT_DIR / name), size)


def gradient_bg() -> Image.Image:
    bg = Image.new("RGB", (W, H))
    px = bg.load()
    for x in range(W):
        t = x / (W - 1)
        col = lerp(CORAL, CORAL_MID, t / 0.45) if t < 0.45 else lerp(CORAL_MID, CORAL_DARK, (t - 0.45) / 0.55)
        for y in range(H):
            vy = 1 - abs(y / H - 0.5) * 0.08
            px[x, y] = tuple(int(c * vy) for c in col)
    bg = bg.convert("RGBA")
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    d.ellipse((-180, -200, 720, 520), fill=(255, 255, 255, 28))
    d.ellipse((W - 880, -120, W + 280, 380), fill=(255, 255, 255, 20))
    d.ellipse((W - 520, H - 220, W + 200, H + 80), fill=(255, 255, 255, 12))
    return Image.alpha_composite(bg, overlay)


def white_logo(height: int) -> Image.Image:
    logo = Image.open(LOGO_SRC).convert("RGBA")
    lp = logo.load()
    for y in range(logo.height):
        for x in range(logo.width):
            if lp[x, y][3] > 20:
                lp[x, y] = (255, 255, 255, lp[x, y][3])
    w = int(logo.width * (height / logo.height))
    return logo.resize((w, height), Image.Resampling.LANCZOS)


def draw_copy_block(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    """Bloco de texto ao lado do logo — zona segura acima do logo da página."""
    serif = 92
    draw.text((x, y), "Mais adesão.", font=dm_serif(serif), fill=(255, 255, 255))
    adesao_w = draw.textlength("Mais adesão.", font=dm_serif(serif))
    draw.text((x + adesao_w + 16, y + 8), "Mais vida.", font=dm_serif(serif, italic=True), fill=(255, 255, 255, 235))

    line_y = y + serif + 18
    draw.rounded_rectangle((x, line_y, x + 200, line_y + 4), radius=2, fill=(255, 255, 255, 120))

    body_y = line_y + 22
    draw.text((x, body_y), "Adesão medicamentosa via WhatsApp.", font=dm_sans(38, "SemiBold"), fill=(255, 255, 255))
    draw.text(
        (x, body_y + 52),
        "Para farmácias e redes de saúde.",
        font=dm_sans(32, "Regular"),
        fill=(255, 255, 255, 220),
    )
    draw.text(
        (x, body_y + 98),
        "Porque saúde é mais que um lembrete",
        font=dm_sans(26, "Regular"),
        fill=(255, 255, 255, 175),
    )


def layout_content(bg: Image.Image, with_photo: bool) -> None:
    logo_h = 200
    logo = white_logo(logo_h)
    logo_x = OVERLAP_RIGHT + 40
    logo_y = (H - logo_h) // 2 - 30
    bg.paste(logo, (logo_x, logo_y), logo)

    text_x = logo_x + logo.width + 56
    text_y = logo_y + 8
    draw = ImageDraw.Draw(bg)
    draw_copy_block(draw, text_x, text_y)

    # @instagram — canto inferior direito (fora da zona do logo da página)
    draw.text(
        (W - 520, H - 72),
        "@kokoro.saude",
        font=dm_sans(28, "Medium"),
        fill=(255, 255, 255, 150),
    )

    if with_photo:
        add_photo_strip(bg)
    else:
        decor_typography(draw)


def add_photo_strip(bg: Image.Image) -> None:
    if not GEMINI.exists():
        return
    gem = Image.open(GEMINI).convert("RGBA")
    gw, _ = gem.size
    photo = gem.crop((int(gw * 0.72), 0, gw, gem.height))
    photo_w = int(W * 0.32)
    photo = photo.resize((photo_w, H), Image.Resampling.LANCZOS)
    wash = Image.new("RGB", photo.size, CORAL_MID)
    photo = Image.blend(photo.convert("RGB"), wash, 0.28).convert("RGBA")
    fade = Image.new("L", (photo_w, H), 0)
    fd = ImageDraw.Draw(fade)
    for x in range(photo_w):
        fd.line([(x, 0), (x, H)], fill=int(255 * min(1, max(0, (x - photo_w * 0.08) / (photo_w * 0.45)))))
    photo.putalpha(fade)
    bg.paste(photo, (W - photo_w + 24, 0), photo)


def decor_typography(draw: ImageDraw.ImageDraw) -> None:
    bubbles = [
        (2900, 140, 3180, 220, 22),
        (3100, 280, 3420, 360, 18),
        (2750, 420, 3020, 500, 18),
    ]
    for x1, y1, x2, y2, r in bubbles:
        draw.rounded_rectangle((x1, y1, x2, y2), radius=r, outline=(255, 255, 255, 65), width=2)
    for cx, cy, rad in [(3500, 160, 140), (3750, 420, 180), (3200, 520, 100)]:
        draw.ellipse((cx - rad, cy - rad, cx + rad, cy + rad), outline=(255, 255, 255, 35), width=2)
    draw.arc((3600, 80, 4000, 480), start=210, end=310, fill=(255, 255, 255, 45), width=2)


def build(variant: str) -> Image.Image:
    bg = gradient_bg()
    layout_content(bg, with_photo=(variant == "foto"))
    return bg


def main() -> None:
    for path in [FONT_DIR / "DMSans.ttf", FONT_DIR / "DMSerifDisplay-Regular.ttf", LOGO_SRC]:
        if not path.exists():
            raise FileNotFoundError(path)

    outputs = {
        "foto": PUBLIC / "kokoro-linkedin-cover-foto.png",
        "tipografia": PUBLIC / "kokoro-linkedin-cover-tipografia.png",
    }

    for variant, out in outputs.items():
        img = build(variant).convert("RGB")
        img.save(out, quality=92, optimize=True)
        size_mb = out.stat().st_size / (1024 * 1024)
        print(f"✓ {out} ({W}×{H}, {size_mb:.2f} MB)")
        if size_mb > 3:
            jpg = out.with_suffix(".jpg")
            img.save(jpg, quality=88, optimize=True)
            print(f"  ⚠ PNG > 3 MB — versão JPEG: {jpg} ({jpg.stat().st_size / (1024 * 1024):.2f} MB)")


if __name__ == "__main__":
    main()
