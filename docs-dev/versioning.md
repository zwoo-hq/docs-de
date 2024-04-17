# Versioning

zwoo follows standard semantic versioning in the means of front/backend compatibility. Since zwoo always realeses front & backend in combination, this means that
- a BREAKING change entails breaking changes in the REST API or ZRP
- a MAJOR change entails a new functionality in the REST API or ZRP
- a MINOR change entails bug fixes in either front or backend or new features that do not effect the other end

Usually to server decides whether the client is compatible (using the `/discover` endpoint), but in case that the client is ahead the client needs to decide based on the servers version.   

## Compatibility guide

### same version

If the ZRP & REST API Version of client and server match a 100% compatibility is guaranteed.

### client ahead

| difference    | compatible?                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| >= 1 Breaking | no                                                                                                       |
| >= 1 Major    | yes, if the changes introduce features that are not directly accessible via the gui, like new game rules |
| >= 1 Minor    | yes                                                                                                      |

### server ahead

| difference    | compatible?                                                                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| >= 1 Breaking | no                                                                                                                                           |
| >= 1 Major    | yes, if the changes introduce features that do not need an interaction by the client, like new REST API Endpoints, or certain new game rules |
| >= 1 Minor    | yes                                                                                                                                          |

