import socket
import json
import threading
import sys

lock = threading.Lock()
open_port=[]
close_port=[]

def check_ip(target,port):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(0.5)
        result = s.connect_ex((target, port))
        service=socket.getservbyport(port,"tcp")
        s.close()
        with lock:
          if result == 0:
           open_port.append({"port": port, "service": service})
          else:
            close_port.append({"port":port,"service":service})
    except:
        pass

def main():
    ip=sys.argv[1]
    sp=int(sys.argv[2])
    ep=int(sys.argv[3])
    threads=[]
    for port in range(sp,ep+1):
        t=threading.Thread(target=check_ip,args=(ip,port))
        threads.append(t)
        t.start()
    for t in threads:
        t.join()
    open_port.sort(key=lambda x: x["port"])
    close_port.sort(key=lambda x: x["port"])
    returns = {
        "opened ports": open_port,
        "closed ports": close_port
    }

    return json.dumps(returns)

if __name__ == "__main__":
    val=main()
    print(val)
