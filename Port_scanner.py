import socket
import threading

lock = threading.Lock()

def check_port(ip, port):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(0.5)
        result = s.connect_ex((ip, port))

        try:
            service = socket.getservbyport(port, "tcp")
        except:
            service = "unknown"

        s.close()

        with lock:
            if result == 0:
                print(f"Port {port:<5} ({service:<10}) → OPEN")
            else:
                print(f"Port {port:<5} ({service:<10}) → CLOSED")

    except:
        pass


def main():
    ip = input("Enter target IP: ").strip()
    sp = int(input("Enter starting port: "))
    ep = int(input("Enter ending port: "))

    print("\nScanning...\n")

    threads = []
    for port in range(sp, ep + 1):
        t = threading.Thread(target=check_port, args=(ip, port))
        threads.append(t)
        t.start()

    for t in threads:
        t.join()

    print("\nScan complete.")
    

if __name__ == "__main__":
    main()
