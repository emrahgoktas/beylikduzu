# Masaj Beylikduzu

Next.js App Router tabanli landing page + Supabase destekli admin panel.

## Lokal Calistirma

```bash
npm install
npm run dev
```

## Ortam Degiskenleri

`.env.local` dosyasina asagidakileri ekleyin:

```env
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Supabase Kurulumu

1. Supabase projesi olusturun.
2. SQL Editor uzerinden `supabase/schema.sql` dosyasini calistirin.
3. Supabase Authentication icin Email/Password provider acik olsun.
4. `profiles` tablosunda admin kullanicinin `role` degerini `admin` yapin.

## Admin Panel

- Giris sayfasi: `/giris`
- Admin panel: `/admin`
- Galeri yonetimi: `/admin` icerisinden slot bazli gorsel yukleme

Yukleme ekraninda her slot icin onerilen gorsel boyutu belirtilir ve oran kontrolu yapilir.

## Vercel Deploy

Vercel ile deploy edilirken Project Settings > Environment Variables alanina su degerleri ekleyin:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_GA_ID` (opsiyonel)
- `NEXT_PUBLIC_GTM_ID` (opsiyonel)

Supabase env degerleri girilmediginde public sayfalar fallback gorsellerle calisir, admin girisi aktif olmaz.
