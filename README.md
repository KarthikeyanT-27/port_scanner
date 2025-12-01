**⚡ Port Scanner — Python (Threaded)**

A lightweight, fast TCP port scanner built using Python and threading.
It checks a range of ports on a target IP and displays OPEN or CLOSED status along with the detected service name.

Perfect for learning networking concepts, ethical hacking practice, or integrating into a larger cybersecurity toolkit.

🚀 Features:

  * Scans any custom port range
  *  Fast multi-threaded scanning
  *  Detects service names (HTTP, SSH, FTP, etc.)
  *  Simple terminal-based input
  *  Clean OPEN/CLOSED output
  *  No external dependencies — pure Python

🛠 Requirements

  Python 3.x
  Works on Windows, Linux, and macOS
  No external libraries needed

▶️ Usage

Run the script:
python portscanner.py
You will be prompted for:

Enter target IP: 192.168.1.10
Enter starting port: 1
Enter ending port: 200

📝 Sample Output
Scanning...

Port 22    (ssh       ) → OPEN
Port 80    (http      ) → OPEN
Port 21    (ftp       ) → CLOSED
Port 25    (smtp      ) → CLOSED

Scan complete.

📌 Code Snippet

Your script internally uses:

socket → for TCP connection attempts

getservbyport() → to identify service names

threading → to speed up the scan

Example core logic:

result = s.connect_ex((ip, port))
if result == 0:
    print(f"Port {port} ({service}) → OPEN")
else:
    print(f"Port {port} ({service}) → CLOSED")

⚠️ Legal Notice

This tool is for:
educational use
security research
scanning systems you own or have permission to test
Unauthorized scanning of systems may violate laws.


