from scapy.all import sniff
from collections import Counter
import os

packet_stats = Counter({
    "TCP": 0,
    "UDP": 0,
    "ICMP": 0,
    "OTHER": 0,
    "TOTAL": 0
})


def packet_callback(packet):

    packet_stats["TOTAL"] += 1

    if packet.haslayer("TCP"):
        packet_stats["TCP"] += 1

    elif packet.haslayer("UDP"):
        packet_stats["UDP"] += 1

    elif packet.haslayer("ICMP"):
        packet_stats["ICMP"] += 1

    else:
        packet_stats["OTHER"] += 1


def start_capture():

    # Skip packet capture on Render
    if os.getenv("RENDER") == "true":
        print("Packet capture disabled on Render.")
        return

    try:
        sniff(
            prn=packet_callback,
            store=False
        )

    except PermissionError:
        print("Packet capture permission denied. Running without live capture.")

    except Exception as e:
        print(f"Packet capture error: {e}")