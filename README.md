# UUID implementation

UUID (Universally Unique IDentifier) is a simply 128-bit number used to uniquely identify items in software development. Its canonical textual representation is as a series of 32 hexadecimal characters which are separated into five groups by hyphens.

Groups sizes:

```TXT
8-4-4-4-12
```

Template:

```TXT
xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
```

_M_ – version number;

_N_ – variant field (determines the layout of the information embedded in the UUID).



### UUID Version 1 (Time Based)

This version uses UUID timestamp – the number of 100 nanosecond time intervals since October 15, 1582 (date of Gregorian reform to the Christian calendar). To assemble a Version 1 UUID, we need to do the following steps:

1. Take the low 32 bits of the current UUID timestamp. These will be the first 4 bytes (8 hex characters) of our UUID – _TimeLow_;
2. Take the middle 16 bits of the current UUID timestamp. These will be the following 2 bytes (4 hex characters) of our UUID – _TimeMid_;
3. The next 2 bytes (4 hex characters) will concatenate the 4-bit UUID version with the remaining 12 bits of the current UUID timestamp (which is 60 bits in total) – _VersionAndTimeHigh_;
4. The next 1-3 bits will specify the UUID variant. The remaining bits of this group will contain the clock sequence which is meant to add some randomness to UUID which helps to avoid collisions in the event multiple UUID generators running on the same system – _VariantAndClockSequence_;
5. The final 6 bytes are the "node id" which is most commonly the MAC address of the issuing device – _NodeID_.


### UUID Version 4 (PseudoRandom Number Generator)

Most commonly implemented in modern programming languages. Its implementation is reasonably simple:

1. Generate 128 random bits;
2. Take the 7th byte and set the version number;
3. Take the 9th byte and set the variant number;
5. Convert the 128 bits to hexadecimal representation and insert the hyphens to achieve the canonical text representation.
