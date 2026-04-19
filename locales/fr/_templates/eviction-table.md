| Bibliothèque   | Utilisée Par                               | Mémoire Libérée |
| :------------- | :----------------------------------------- | :-------------: |
| `slixmpp`      | `xmpp://`                                  |     ~20 MB      |
| `paho`         | `mqtt://`                                  |      ~4 MB      |
| `gntp`         | `growl://`                                 |      ~2 MB      |
| `smpplib`      | `smpp://`, `smpps://`                      |      ~2 MB      |
| `pgpy`         | `mailto://`, `mailtos://` (PGP uniquement) |     ~10 MB      |
| `cryptography` | `simplepush://`, `fcm://`, `vapid://`      |   partielle†    |

†`cryptography` s'appuie nativement sur OpenSSL. Les objets d'encapsulation
Python sont libérés, mais la bibliothèque partagée sous-jacente reste chargée
par le système d'exploitation pendant toute la durée de vie du processus.
