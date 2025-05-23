FROM postgres:13.20

# Cài locale tiếng Việt
RUN apt-get update && apt-get install -y locales \
    && echo "vi_VN.UTF-8 UTF-8" >> /etc/locale.gen \
    && locale-gen

ENV LANG=vi_VN.utf8
ENV LANGUAGE=vi_VN:vi
ENV LC_ALL=vi_VN.utf8
