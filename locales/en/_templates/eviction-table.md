| Library        | Used By                               | Freed Memory |
| :------------- | :------------------------------------ | :----------: |
| `slixmpp`      | `xmpp://`                             |    ~20 MB    |
| `paho`         | `mqtt://`                             |    ~4 MB     |
| `gntp`         | `growl://`                            |    ~2 MB     |
| `smpplib`      | `smpp://`, `smpps://`                 |    ~2 MB     |
| `hid`          | `blink1://`                           |    ~2 MB     |
| `pgpy`         | `mailto://`, `mailtos://` (PGP only)  |    ~10 MB    |
| `cryptography` | `simplepush://`, `fcm://`, `vapid://` |   partial†   |

†`cryptography` links against OpenSSL natively. The Python wrapper objects are
released, but the underlying shared library remains mapped by the OS for the
process lifetime.
