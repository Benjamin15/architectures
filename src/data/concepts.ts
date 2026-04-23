export type CodeSnippet = {
  language: string;
  code: string;
  title?: string;
};

export type Concept = {
  id: string;
  title: string;
  description: string;
  importance: string;
  howToApply: string;
  codeSnippet?: CodeSnippet;
};

export type Category = {
  id: string;
  title: string;
  description: string;
  color: string;
  concepts: Concept[];
};

export const apiData: Category[] = [
  {
    id: "foundations",
    title: "Foundations",
    description: "Les bases fondamentales pour comprendre et concevoir des APIs robustes.",
    color: "#10b981", // Emerald
    concepts: [
      {
        id: "api-contract",
        title: "API Contract",
        description: "Un accord formel entre le fournisseur de l'API et le consommateur, définissant comment l'API se comporte, les requêtes attendues et les réponses renvoyées.",
        importance: "Évite les malentendus entre les équipes front-end et back-end. Garantit que l'API est prévisible et fiable.",
        howToApply: "Utilisez des standards comme OpenAPI (Swagger) pour documenter et partager votre contrat avant même d'écrire le code (Design-First approach).",
        codeSnippet: {
          language: "yaml",
          title: "openapi.yaml",
          code: `openapi: 3.0.0
info:
  title: Users API
  version: 1.0.0
paths:
  /users:
    get:
      summary: Retrieve a list of users
      responses:
        '200':
          description: A list of users
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/User'`
        }
      },
      {
        id: "endpoints-uri-design",
        title: "Endpoints & URI Design",
        description: "L'art de concevoir des chemins (URLs) clairs, hiérarchiques et intuitifs pour accéder aux ressources de l'API.",
        importance: "Une bonne conception rend l'API auto-descriptive et facile à explorer pour les développeurs.",
        howToApply: "Utilisez des noms au pluriel pour les ressources (ex: `/users` et non `/user`). Utilisez des hiérarchies claires (`/users/123/orders`). Évitez les verbes dans les URIs (`/get-users` ❌ -> `GET /users` ✅).",
        codeSnippet: {
          language: "http",
          title: "Exemple de bonnes et mauvaises URIs",
          code: `// Mauvais design (utilisation de verbes et non hiérarchique)
POST /createUser
GET /getOrdersForUser?userId=123

// Bon design RESTful (Hiérarchique et basé sur les ressources)
POST /users
GET /users/123/orders`
        }
      },
      {
        id: "http-methods",
        title: "HTTP Methods",
        description: "Les verbes standardisés (GET, POST, PUT, PATCH, DELETE) indiquant l'action à effectuer sur une ressource.",
        importance: "Standardise les interactions et tire parti du protocole HTTP de manière sémantique.",
        howToApply: "GET pour lire, POST pour créer, PUT pour remplacer complètement, PATCH pour modifier partiellement, DELETE pour supprimer.",
        codeSnippet: {
          language: "javascript",
          title: "app.js (Express)",
          code: `// Exemple de mapping des méthodes HTTP en Express.js
app.get('/articles', getArticles);          // Lire la liste
app.post('/articles', createArticle);       // Créer un article
app.get('/articles/:id', getArticle);       // Lire un article spécifique
app.put('/articles/:id', replaceArticle);   // Remplacer entièrement l'article
app.patch('/articles/:id', updateArticle);  // Mettre à jour quelques champs
app.delete('/articles/:id', deleteArticle); // Supprimer l'article`
        }
      },
      {
        id: "http-status-codes",
        title: "HTTP Status Codes",
        description: "Codes numériques standardisés (2xx, 3xx, 4xx, 5xx) renvoyés par le serveur pour indiquer le résultat de la requête.",
        importance: "Permet aux clients de comprendre facilement si une requête a réussi ou d'identifier la nature de l'erreur sans parser le corps de la réponse.",
        howToApply: "Utilisez 200 pour le succès, 201 pour la création, 400 pour une mauvaise requête client, 401/403 pour l'authentification/autorisation, 404 pour non trouvé, et 500 pour les erreurs serveur.",
        codeSnippet: {
          language: "javascript",
          title: "userController.js",
          code: `app.post('/users', async (req, res) => {
  try {
    const user = await db.users.create(req.body);
    // 201 Created
    res.status(201).json(user);
  } catch (error) {
    if (error.name === 'ValidationError') {
      // 400 Bad Request
      res.status(400).json({ error: error.message });
    } else {
      // 500 Internal Server Error
      res.status(500).json({ error: "Une erreur interne est survenue." });
    }
  }
});`
        }
      },
      {
        id: "request-response-structure",
        title: "Request-Response Structure",
        description: "Le format standardisé des données envoyées au serveur (requête) et reçues (réponse), incluant les headers et le body.",
        importance: "Une structure cohérente facilite le parsing et la gestion des données par les clients.",
        howToApply: "Maintenez une structure JSON uniforme. Pour les réponses, encapsulez souvent les données (ex: `{ \"data\": [...] }`) et standardisez la structure des erreurs.",
        codeSnippet: {
          language: "json",
          title: "Réponse standardisée JSON",
          code: `{
  "data": {
    "id": "usr_123",
    "email": "alice@example.com",
    "role": "admin"
  },
  "meta": {
    "requestId": "req_88x22",
    "timestamp": "2023-10-24T12:00:00Z"
  }
}`
        }
      },
      {
        id: "media-types",
        title: "Media Types & Content Negotiation",
        description: "Mécanisme permettant au client et au serveur de s'accorder sur le format des données (ex: `application/json`, `application/xml`) via les headers `Accept` et `Content-Type`.",
        importance: "Permet à l'API de servir plusieurs formats sans changer l'URI, offrant plus de flexibilité.",
        howToApply: "Lisez le header `Accept` de la requête client et renvoyez le format approprié avec le bon header `Content-Type` dans la réponse.",
        codeSnippet: {
          language: "http",
          title: "Requête HTTP avec en-têtes de négociation",
          code: `GET /reports/annual HTTP/1.1
Host: api.example.com
Accept: application/pdf
Authorization: Bearer abc123def456

HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Length: 1048576

[Données binaires du PDF...]`
        }
      },
      {
        id: "statelessness",
        title: "Statelessness",
        description: "Principe selon lequel chaque requête d'un client au serveur doit contenir toutes les informations nécessaires pour être comprise et traitée, sans dépendre du contexte serveur.",
        importance: "Améliore grandement la scalabilité, car n'importe quel serveur peut traiter n'importe quelle requête sans avoir à synchroniser des sessions.",
        howToApply: "N'utilisez pas de sessions côté serveur. Utilisez des tokens (comme JWT) envoyés à chaque requête pour l'authentification et l'état de l'utilisateur.",
        codeSnippet: {
          language: "http",
          title: "Exemple de requêtes Stateless",
          code: `// Le serveur ne "se souvient" pas de l'utilisateur entre les requêtes.
// Le contexte complet (ici le Bearer token) doit être renvoyé à chaque fois.

// Requête 1
GET /cart HTTP/1.1
Authorization: Bearer token_xyz123

// Requête 2 (Indépendante)
POST /checkout HTTP/1.1
Authorization: Bearer token_xyz123
{ "cart_id": "445" }`
        }
      }
    ]
  },
  {
    id: "styles-patterns",
    title: "API Styles & Patterns",
    description: "Les différents paradigmes et architectures pour construire et structurer vos APIs.",
    color: "#3b82f6", // Blue
    concepts: [
      {
        id: "rest",
        title: "REST (Representational State Transfer)",
        description: "Style d'architecture basé sur des ressources identifiées par des URIs et manipulées via les méthodes HTTP standard.",
        importance: "C'est le standard de facto du web, facile à comprendre, à cacher et hautement scalable.",
        howToApply: "Respectez les contraintes REST (Client-Serveur, Stateless, Cacheable, Interface Uniforme). Parfait pour les applications CRUD classiques.",
        codeSnippet: {
          language: "http",
          title: "Interactions REST classiques",
          code: `// Créer
POST /users HTTP/1.1
{ "name": "Alice" } -> 201 Created

// Lire
GET /users/123 HTTP/1.1 -> 200 OK

// Mettre à jour
PUT /users/123 HTTP/1.1
{ "name": "Alice B." } -> 200 OK

// Supprimer
DELETE /users/123 HTTP/1.1 -> 204 No Content`
        }
      },
      {
        id: "rpc",
        title: "RPC (Remote Procedure Call)",
        description: "Modèle où le client exécute une fonction sur le serveur comme si c'était une fonction locale.",
        importance: "Simple pour des actions qui ne se mappent pas bien à des ressources (ex: `calculateTax()`).",
        howToApply: "Utilisez-le pour des APIs internes ou des actions complexes orientées processus, en passant les paramètres nécessaires dans le corps de la requête POST.",
        codeSnippet: {
          language: "json",
          title: "Exemple de Payload JSON-RPC",
          code: `{
  "jsonrpc": "2.0",
  "method": "calculateTaxes",
  "params": {
    "amount": 100,
    "countryCode": "FR"
  },
  "id": 1
}`
        }
      },
      {
        id: "grpc",
        title: "gRPC",
        description: "Un framework RPC moderne et performant développé par Google, utilisant HTTP/2 et Protocol Buffers (Protobuf).",
        importance: "Extrêmement rapide, fortement typé, parfait pour la communication inter-microservices.",
        howToApply: "Définissez vos services et messages dans des fichiers `.proto`, générez le code client/serveur automatiquement. Idéal pour les communications backend-à-backend.",
        codeSnippet: {
          language: "protobuf",
          title: "service.proto",
          code: `syntax = "proto3";

service PaymentService {
  rpc ProcessPayment (PaymentRequest) returns (PaymentResponse);
}

message PaymentRequest {
  string user_id = 1;
  float amount = 2;
  string currency = 3;
}

message PaymentResponse {
  bool success = 1;
  string transaction_id = 2;
}`
        }
      },
      {
        id: "graphql",
        title: "GraphQL",
        description: "Un langage de requête pour APIs permettant au client de demander exactement les données dont il a besoin, ni plus ni moins.",
        importance: "Résout les problèmes d'over-fetching et d'under-fetching de REST. Excellent pour les clients mobiles et les UIs complexes.",
        howToApply: "Exposez un seul endpoint. Définissez un schéma strict. Laissez les clients composer leurs requêtes pour assembler les données de multiples sources.",
        codeSnippet: {
          language: "graphql",
          title: "Requête GraphQL",
          code: `query GetUserWithPosts {
  user(id: "123") {
    name
    email
    posts(limit: 2) {
      title
      createdAt
    }
  }
}`
        }
      },
      {
        id: "websockets",
        title: "WebSockets",
        description: "Protocole permettant une communication bidirectionnelle, full-duplex et persistante entre le client et le serveur.",
        importance: "Essentiel pour les applications temps réel (chat, trading, jeux) où le serveur doit pousser des données au client sans que celui-ci ne les demande.",
        howToApply: "Établissez une connexion via le handshake HTTP (Upgrade), puis échangez des messages asynchrones en continu.",
        codeSnippet: {
          language: "javascript",
          title: "Client WebSocket en JavaScript",
          code: `const ws = new WebSocket('wss://api.example.com/chat');

ws.onopen = () => {
  console.log('Connecté au serveur en temps réel !');
  ws.send(JSON.stringify({ action: 'join_room', room: 'general' }));
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Nouveau message reçu :', message.text);
};`
        }
      },
      {
        id: "webhooks",
        title: "Webhooks",
        description: "Mécanisme de 'reverse API' où le serveur envoie un appel HTTP (généralement POST) à une URL client lorsqu'un événement se produit.",
        importance: "Évite au client de devoir faire du 'polling' (vérifier continuellement si des données ont changé), économisant des ressources.",
        howToApply: "Permettez à vos utilisateurs d'enregistrer des URLs de destination dans votre système. Lors d'un événement (ex: 'Paiement reçu'), envoyez un payload JSON à cette URL.",
        codeSnippet: {
          language: "javascript",
          title: "Serveur Node.js recevant un Webhook (Stripe)",
          code: `app.post('/webhook/stripe', express.raw({type: 'application/json'}), (req, res) => {
  const event = req.body; // L'événement envoyé par Stripe

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log(\`Paiement de \${paymentIntent.amount} réussi !\`);
    // Débloquer la commande...
  }

  // Renvoie un 200 OK pour confirmer la réception
  res.status(200).send();
});`
        }
      },
      {
        id: "sync-async",
        title: "Sync vs Async & Long-Running APIs",
        description: "La distinction entre des requêtes qui attendent la fin d'un processus (Sync) et celles qui initient un processus et renvoient un accusé de réception immédiatement (Async).",
        importance: "Empêche les timeouts HTTP et le blocage des threads serveurs pour les tâches lourdes (ex: génération de rapport).",
        howToApply: "Pour les tâches longues, renvoyez un HTTP 202 (Accepted) avec un header `Location` pointant vers un endpoint de statut, ou utilisez un Webhook pour notifier la fin.",
        codeSnippet: {
          language: "http",
          title: "Requête Asynchrone (HTTP 202)",
          code: `POST /reports/generate HTTP/1.1
Host: api.example.com

HTTP/1.1 202 Accepted
Location: /reports/status/job-12345
Retry-After: 30

{
  "jobId": "job-12345",
  "status": "processing"
}`
        }
      }
    ]
  },
  {
    id: "contracts-testing-docs",
    title: "Contracts, Testing & Docs",
    description: "Les pratiques essentielles pour documenter, valider et tester la fiabilité de vos APIs.",
    color: "#8b5cf6", // Violet
    concepts: [
      {
        id: "openapi",
        title: "OpenAPI Specification",
        description: "Un format standardisé (JSON ou YAML) pour décrire les capacités d'une API RESTful.",
        importance: "Génère automatiquement la documentation (ex: Swagger UI), les SDKs clients, et permet la validation.",
        howToApply: "Maintenez un fichier `openapi.yaml` à jour. Utilisez des outils comme Redoc ou Swagger UI pour générer des pages interactives pour vos développeurs.",
        codeSnippet: {
          language: "yaml",
          title: "Extrait de schéma OpenAPI",
          code: `components:
  schemas:
    Error:
      type: object
      required:
        - code
        - message
      properties:
        code:
          type: integer
          format: int32
        message:
          type: string`
        }
      },
      {
        id: "schemas-validation",
        title: "Schemas & Validation",
        description: "La définition stricte de la forme des données entrantes et sortantes, et la vérification automatique que les requêtes s'y conforment.",
        importance: "Protège l'application contre les données malformées ou malveillantes, et garantit l'intégrité des données.",
        howToApply: "Utilisez des bibliothèques de validation (comme Zod en TS, Joi) connectées à vos routes pour rejeter avec un 400 Bad Request les payloads non conformes.",
        codeSnippet: {
          language: "typescript",
          title: "Validation avec Zod (TypeScript)",
          code: `import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email("L'email est invalide"),
  age: z.number().min(18, "L'utilisateur doit être majeur"),
  role: z.enum(["admin", "user"]).default("user")
});

app.post('/users', (req, res) => {
  // Valide le body, throw une erreur si invalide
  const validData = UserSchema.parse(req.body); 
  db.save(validData);
});`
        }
      },
      {
        id: "contract-testing",
        title: "Contract Testing",
        description: "Des tests qui s'assurent que les consommateurs et les fournisseurs d'une API sont d'accord sur les interactions, basés sur un contrat partagé.",
        importance: "Détecte les 'breaking changes' avant le déploiement. Moins fragile que les tests end-to-end classiques.",
        howToApply: "Utilisez des outils comme Pact. Le client définit ses attentes (contrat), et le fournisseur valide qu'il peut y répondre correctement dans son CI/CD.",
        codeSnippet: {
          language: "typescript",
          title: "Définition d'un contrat (Pact)",
          code: `provider.addInteraction({
  state: 'i have a list of projects',
  uponReceiving: 'a request for projects',
  withRequest: {
    method: 'GET',
    path: '/projects',
    headers: { 'Accept': 'application/json' }
  },
  willRespondWith: {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: EXPECTED_BODY
  }
})`
        }
      },
      {
        id: "docs-discoverability",
        title: "Documentation & Discoverability",
        description: "Rendre l'API facile à apprendre et à explorer grâce à une documentation claire, des tutoriels, et potentiellement du format HATEOAS.",
        importance: "L'adoption d'une API (surtout publique) dépend à 90% de la qualité de sa documentation.",
        howToApply: "Fournissez non seulement des références d'endpoints générées automatiquement, mais aussi des guides de démarrage (Getting Started), des exemples de code et une Sandbox.",
        codeSnippet: {
          language: "json",
          title: "Exemple de Discoverability via HATEOAS (Liens Hypermedia)",
          code: `{
  "accountId": "12345",
  "balance": 100.00,
  "links": {
    "self": "/accounts/12345",
    "deposit": "/accounts/12345/deposit",
    "withdraw": "/accounts/12345/withdraw",
    "transfer": "/accounts/12345/transfer",
    "close": "/accounts/12345/close"
  }
}`
        }
      }
    ]
  },
  {
    id: "auth-security",
    title: "Auth & Security",
    description: "Mécanismes pour protéger les données et s'assurer que seuls les utilisateurs autorisés peuvent effectuer des actions.",
    color: "#ef4444", // Red
    concepts: [
      {
        id: "auth-vs-authz",
        title: "Authentication vs Authorization",
        description: "L'Authentification (AuthN) vérifie *qui* vous êtes. L'Autorisation (AuthZ) vérifie *ce que vous avez le droit de faire*.",
        importance: "C'est la distinction fondamentale de toute sécurité applicative.",
        howToApply: "Vérifiez l'identité d'abord (login -> token). Ensuite, à chaque requête critique, vérifiez les permissions associées à ce token avant d'agir.",
        codeSnippet: {
          language: "javascript",
          title: "Middleware Express (AuthN vs AuthZ)",
          code: `// 1. Authentification : Es-tu connecté ?
const requireAuth = (req, res, next) => {
  if (!req.user) return res.status(401).send("Non authentifié");
  next();
};

// 2. Autorisation : As-tu les droits ?
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') return res.status(403).send("Accès refusé");
  next();
};

app.delete('/users/:id', requireAuth, requireAdmin, deleteUser);`
        }
      },
      {
        id: "api-keys",
        title: "API Keys",
        description: "Des chaînes de caractères secrètes passées par le client pour identifier le projet ou l'application appelante.",
        importance: "Simple à implémenter pour des interactions machine-à-machine basiques ou des APIs publiques limitées.",
        howToApply: "Passez la clé via un header HTTP (ex: `X-API-Key`). Ne l'utilisez pas pour l'authentification d'utilisateurs humains individuels.",
        codeSnippet: {
          language: "http",
          title: "Utilisation d'une API Key",
          code: `GET /weather?city=Paris HTTP/1.1
Host: api.weather.com
X-API-Key: a1b2c3d4e5f6g7h8i9j0`
        }
      },
      {
        id: "oauth2",
        title: "OAuth 2.0",
        description: "Un framework d'autorisation permettant à des applications tierces d'obtenir un accès limité à un service HTTP.",
        importance: "Le standard de l'industrie pour déléguer l'accès sans partager les mots de passe (ex: 'Se connecter avec Google').",
        howToApply: "Utilisez le flux d'Authorization Code (avec PKCE pour les clients publics) pour émettre des Access Tokens sécurisés.",
        codeSnippet: {
          language: "http",
          title: "Requête d'Authorization Code OAuth2",
          code: `GET /authorize?
  response_type=code&
  client_id=s6BhdRkqt3&
  state=xyz&
  redirect_uri=https%3A%2F%2Fclient%2Eexample%2Ecom%2Fcb HTTP/1.1
Host: server.example.com`
        }
      },
      {
        id: "jwts",
        title: "JWTs & Token Validation",
        description: "JSON Web Tokens : un format compact et autonome pour transmettre des informations sécurisées entre les parties sous forme d'objet JSON.",
        importance: "Permet une autorisation stateless. Le serveur peut valider le token mathématiquement sans interroger la base de données.",
        howToApply: "Signez vos JWTs avec un algorithme fort (RS256). Validez la signature, l'expiration (`exp`), et le public ciblé (`aud`) à chaque requête.",
        codeSnippet: {
          language: "json",
          title: "Structure (Payload) d'un JWT décodé",
          code: `{
  "sub": "user_12345",
  "name": "John Doe",
  "role": "admin",
  "iat": 1516239022,
  "exp": 1516242622
}`
        }
      },
      {
        id: "tls-https",
        title: "TLS / HTTPS",
        description: "Le cryptage des données en transit entre le client et le serveur.",
        importance: "Rend impossible l'interception et la lecture des mots de passe, tokens ou données sensibles par des attaquants (Man-in-the-Middle).",
        howToApply: "N'acceptez JAMAIS de trafic non crypté (HTTP) en production. Redirigez systématiquement vers HTTPS. Utilisez HSTS.",
        codeSnippet: {
          language: "http",
          title: "Strict-Transport-Security (HSTS)",
          code: `// Le serveur force le navigateur à n'utiliser que HTTPS pendant 1 an
HTTP/1.1 200 OK
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
        }
      }
    ]
  },
  {
    id: "design-evolution",
    title: "Design & Evolution",
    description: "Concevoir des APIs flexibles, durables et capables d'évoluer sans casser les clients existants.",
    color: "#0ea5e9", // Light blue
    concepts: [
      {
        id: "resource-modeling",
        title: "Resource Modeling",
        description: "Le processus d'identification des entités métier et de leurs relations pour les exposer de manière cohérente.",
        importance: "Définit la 'forme' de votre API. Un mauvais modèle rend l'API compliquée et inefficace.",
        howToApply: "Pensez en termes de noms et non de verbes. Identifiez les ressources principales et les sous-ressources.",
        codeSnippet: {
          language: "http",
          title: "Relations entre ressources",
          code: `// Bon : Un article appartient à un auteur
GET /authors/12/articles/34

// Bon : Action métier en tant que sous-ressource (REST pragmatique)
POST /users/123/suspend`
        }
      },
      {
        id: "pagination",
        title: "Pagination",
        description: "Diviser de larges ensembles de résultats en pages plus petites.",
        importance: "Améliore les performances de l'API et réduit la consommation de bande passante.",
        howToApply: "Utilisez la pagination Offset (ex: `?limit=20&offset=40`) pour la simplicité, ou la pagination par Curseur pour la performance sur de grands datasets.",
        codeSnippet: {
          language: "http",
          title: "Requête avec Pagination Offset",
          code: `GET /users?limit=50&offset=100 HTTP/1.1
Host: api.example.com`
        }
      },
      {
        id: "api-versioning",
        title: "API Versioning",
        description: "Méthodologie pour introduire des changements majeurs (breaking changes) sans impacter les utilisateurs existants.",
        importance: "Garantit que les applications clientes continuent de fonctionner pendant que l'API évolue.",
        howToApply: "Préférez le versioning via l'URI (`/v1/users`) ou via l'en-tête (Header Accept). Supportez plusieurs versions simultanément.",
        codeSnippet: {
          language: "http",
          title: "Stratégies de Versioning",
          code: `// Approche par l'URI (La plus commune)
GET /v1/users HTTP/1.1

// Approche par Header Accept (La plus "RESTful")
GET /users HTTP/1.1
Accept: application/vnd.myapi.v1+json

// Approche par Query Parameter
GET /users?version=1.0 HTTP/1.1`
        }
      },
      {
        id: "backward-compatibility",
        title: "Backward Compatibility & Deprecation",
        description: "Assurer que les modifications n'invalident pas le contrat existant, et gérer le retrait progressif des anciennes fonctionnalités.",
        importance: "Maintient la confiance des développeurs qui consomment votre API.",
        howToApply: "Ajouter des champs est sûr. Supprimer ou renommer des champs est une rupture. Utilisez des en-têtes `Sunset` et `Deprecation` pour avertir les clients.",
        codeSnippet: {
          language: "http",
          title: "Avertissement de dépréciation (Headers)",
          code: `HTTP/1.1 200 OK
Deprecation: @1640995200
Sunset: Wed, 31 Dec 2025 23:59:59 GMT
Link: <https://developer.example.com/v2-migration>; rel="deprecation"`
        }
      }
    ]
  },
  {
    id: "ops-observability",
    title: "Ops & Observability",
    description: "Les outils et pratiques pour surveiller la santé, les performances et l'utilisation de vos APIs en production.",
    color: "#f59e0b", // Amber
    concepts: [
      {
        id: "api-observability",
        title: "API Observability",
        description: "La capacité de comprendre l'état interne du système à partir de ses sorties externes (Logs, Metrics, Traces).",
        importance: "Indispensable pour débugger les problèmes en production et comprendre les goulots d'étranglement.",
        howToApply: "Implémentez le traçage distribué (OpenTelemetry). Collectez des métriques sur la latence, les taux d'erreur et le trafic (les piliers RED).",
        codeSnippet: {
          language: "json",
          title: "Exemple de Log Structuré",
          code: `{
  "timestamp": "2023-10-24T12:05:14Z",
  "level": "error",
  "message": "Connection to database failed",
  "trace_id": "4bf92f3577b34da6a3ce929d0e0e4736",
  "endpoint": "POST /checkout",
  "duration_ms": 1542
}`
        }
      },
      {
        id: "api-gateway",
        title: "API Gateway",
        description: "Un composant serveur qui agit comme point d'entrée unique pour toutes les requêtes des clients vers divers services backend.",
        importance: "Centralise des responsabilités comme le routage, l'authentification, le rate limiting et la collecte de métriques.",
        howToApply: "Placez une passerelle (ex: Kong, AWS API Gateway) devant vos microservices. N'y mettez pas de logique métier complexe.",
        codeSnippet: {
          language: "yaml",
          title: "Configuration d'une route API Gateway",
          code: `routes:
  - name: user-service-route
    paths:
      - /users
    methods:
      - GET
      - POST
    plugins:
      - name: rate-limiting
        config:
          minute: 60
    service: user-service-backend-internal`
        }
      }
    ]
  },
  {
    id: "reliability-performance",
    title: "Reliability & Performance",
    description: "Techniques pour rendre les APIs résilientes aux pannes, rapides et capables de gérer une forte charge.",
    color: "#8b5cf6", // Purple
    concepts: [
      {
        id: "timeouts",
        title: "Timeouts",
        description: "Une limite de temps définie pendant laquelle le client ou le serveur attendra une réponse avant d'abandonner.",
        importance: "Empêche les ressources du système de rester bloquées indéfiniment en cas de panne réseau ou de backend lent.",
        howToApply: "Configurez des timeouts stricts côté client ET côté serveur. Renvoyez une erreur 504 (Gateway Timeout) lorsque cela se produit.",
        codeSnippet: {
          language: "javascript",
          title: "Timeout côté client (Axios)",
          code: `import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000, // Abandonne si la requête prend plus de 5 secondes
});

try {
  await api.get('/data');
} catch (error) {
  if (error.code === 'ECONNABORTED') {
    console.error('La requête a expiré (Timeout)');
  }
}`
        }
      },
      {
        id: "retries-backoff-jitter",
        title: "Retries with Backoff & Jitter",
        description: "Une stratégie de répétition des requêtes échouées, en augmentant progressivement le délai d'attente (backoff) et en ajoutant de l'aléatoire (jitter).",
        importance: "Permet de surmonter les erreurs réseau transitoires sans créer une tempête de requêtes (Thundering Herd) qui achèverait un service en difficulté.",
        howToApply: "Côté client, si une requête échoue avec un code 5xx, réessayez après 1s, puis 2s, puis 4s, en ajoutant un temps aléatoire (ex: ±20%).",
        codeSnippet: {
          language: "javascript",
          title: "Algorithme d'Exponential Backoff avec Jitter",
          code: `function getRetryDelay(attempt) {
  const baseDelay = 1000; // 1 seconde
  const exponentialDelay = baseDelay * Math.pow(2, attempt);
  
  // Ajout de 0 à 20% d'aléatoire (Jitter)
  const jitter = exponentialDelay * 0.2 * Math.random(); 
  return exponentialDelay + jitter;
}`
        }
      },
      {
        id: "idempotency",
        title: "Idempotency (Keys)",
        description: "La propriété d'une opération qui produit le même résultat, qu'elle soit exécutée une ou plusieurs fois.",
        importance: "Crucial pour les requêtes de création (comme les paiements). Si le client réessaie suite à un timeout réseau, l'action ne doit pas être dupliquée.",
        howToApply: "Utilisez un header `Idempotency-Key` (généré par le client). Le serveur vérifie si cette clé a déjà été traitée ; si oui, il renvoie la réponse précédente.",
        codeSnippet: {
          language: "http",
          title: "Requête avec Clé d'Idempotence",
          code: `POST /payments HTTP/1.1
Host: api.bank.com
Idempotency-Key: 8a9b7c6d-1234-abcd-9876-ef1234567890

{
  "amount": 500,
  "currency": "EUR"
}`
        }
      },
      {
        id: "rate-limiting",
        title: "Rate Limiting, Throttling & Quotas",
        description: "Restreindre le nombre de requêtes qu'un client peut effectuer sur une période donnée.",
        importance: "Protège l'API contre les abus (DDoS accidentel ou malveillant) et garantit une utilisation équitable des ressources.",
        howToApply: "Implémentez-le au niveau de l'API Gateway. Renvoyez un code 429 (Too Many Requests) avec des headers indiquant quand le client peut réessayer (`Retry-After`).",
        codeSnippet: {
          language: "http",
          title: "Réponse HTTP de Rate Limiting",
          code: `HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1609459200
Retry-After: 3600

{
  "error": "Vous avez dépassé votre quota horaire."
}`
        }
      },
      {
        id: "http-caching",
        title: "HTTP Caching",
        description: "Le stockage de copies des réponses HTTP afin de les réutiliser pour les requêtes ultérieures sans repasser par le backend.",
        importance: "Réduit drastiquement la latence et la charge sur les serveurs.",
        howToApply: "Utilisez les headers `Cache-Control` (ex: `max-age`) et `ETag`. Exploitez les CDNs et les caches des navigateurs pour les données statiques ou peu changeantes.",
        codeSnippet: {
          language: "http",
          title: "Headers de Cache HTTP",
          code: `// Réponse du Serveur
HTTP/1.1 200 OK
Cache-Control: public, max-age=3600
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"

// Requête conditionnelle du Client (plus tard)
GET /articles/123 HTTP/1.1
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"

// Si non modifié, le serveur renvoie juste :
HTTP/1.1 304 Not Modified`
        }
      }
    ]
  }
];
