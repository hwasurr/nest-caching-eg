# Nestjs + GraphQL 캐싱

1. Interceptor 사용시 야기될 문제
  - Cache key를 endpoint로 구성한다면 대부분의 경우 하나의 엔드포인트로 GraphQL 요청을 처리하므로 데이터에 알맞게 올바르게 캐시될 수 없음. (캐시 키를 graphql 요청 document로 구성할 수 있을 것.)
  - Interceptor는 매 요청이 아닌 매 Resolver 함수 실행마다 작업이 진행될 수 있음. + 그 이유에 대한 설명 (https://github.com/nestjs/graphql/issues/443)
2. Apollo Server Caching
  - Response caching
  - 캐시 무효화 (https://github.com/apollographql/apollo-server/discussions/5361)
  - ::response 캐시 Interceptor 직접 구성하기?::

